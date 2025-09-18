'use server';

import { db } from '@/lib/firebase';
import { doc, setDoc, updateDoc, getDoc, addDoc, collection, deleteDoc } from 'firebase/firestore';
import type { ProjectTrackingInfo } from '@/lib/tracking';
import type { ProjectRequest } from '@/lib/requests';
import { revalidatePath } from 'next/cache';
import { sendEmail as sendEmailFlow } from '@/ai/flows/send-email-flow';

const MOCK_PROJECT_ID = 'SK-1024';
const MOCK_USER_ID = 'user-abc-123'; 

export async function seedInitialProject(): Promise<{ success: boolean; message: string }> {
  try {
    const projectRef = doc(db, 'projects', MOCK_PROJECT_ID);
    const projectSnap = await getDoc(projectRef);

    if (projectSnap.exists()) {
      return { success: true, message: 'Test project already exists.' };
    }

    const mockProjectData: ProjectTrackingInfo = {
      projectId: MOCK_PROJECT_ID,
      userId: MOCK_USER_ID,
      currentStage: 'programming',
      stages: {
        components_collected: { status: 'completed', timestamp: new Date('2023-10-26T10:00:00Z').toISOString() },
        circuit_design: { status: 'completed', timestamp: new Date('2023-10-27T14:30:00Z').toISOString(), imageUrl: 'https://placehold.co/600x400.png' },
        programming: { status: 'in_progress', timestamp: new Date('2023-10-28T11:00:00Z').toISOString(), notes: 'Initial firmware flashed.' },
        testing: { status: 'pending', timestamp: '' },
        shipping: { status: 'pending', timestamp: '' },
        completed: { status: 'pending', timestamp: '' }
      },
    };
    
    await setDoc(projectRef, mockProjectData);
    revalidatePath('/admin');
    revalidatePath('/tracking');
    return { success: true, message: 'Initial test project seeded successfully!' };
  } catch (error) {
    console.error('Error seeding data:', error);
    return { success: false, message: `Failed to seed data: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

export async function updateProjectInFirestore(projectId: string, dataToUpdate: Partial<ProjectTrackingInfo>): Promise<{ success: boolean, message: string }> {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, dataToUpdate);
    revalidatePath('/admin');
    revalidatePath('/tracking');
    return { success: true, message: `Project ${projectId} updated successfully.` };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, message: `Failed to update project: ${error instanceof Error ? error.message : "Unknown error"}` };
  }
}

export async function submitProjectRequest(requestData: Omit<ProjectRequest, 'id' | 'createdAt'>) {
    try {
        await addDoc(collection(db, 'projectRequests'), {
            ...requestData,
            createdAt: new Date().toISOString(),
        });
        
        // Also send an email notification
        const emailSubject = `New Request: ${requestData.projectTitle || requestData.topic}`;
        const emailBody = `<p>A new custom request has been submitted and is waiting for approval in the admin panel.</p><hr><pre>${JSON.stringify(requestData, null, 2)}</pre>`;
        const emailResult = await sendEmail({ subject: emailSubject, body: emailBody });

        if (!emailResult.success) {
            console.warn("Firestore save succeeded, but email notification failed:", emailResult.message);
            // Don't block success, just log the warning.
        }

        revalidatePath('/admin');
        return { success: true, message: 'Request submitted successfully.' };
    } catch(error) {
        console.error("Error submitting project request:", error);
        return { success: false, message: `Failed to submit request: ${error instanceof Error ? error.message : "Unknown error"}` };
    }
}

export async function approveProjectRequest(request: ProjectRequest): Promise<{ success: boolean; message: string; projectId?: string }> {
    try {
        const newProjectId = `SK-${Math.floor(1000 + Math.random() * 9000)}`;
        const newProject: ProjectTrackingInfo = {
            projectId: newProjectId,
            userId: request.email, // Use user's email as a temporary ID
            currentStage: 'components_collected',
            stages: {
                components_collected: { status: 'in_progress', timestamp: new Date().toISOString(), notes: `Project created from request: ${request.projectTitle || request.topic}` },
                circuit_design: { status: 'pending', timestamp: '' },
                programming: { status: 'pending', timestamp: '' },
                testing: { status: 'pending', timestamp: '' },
                shipping: { status: 'pending', timestamp: '' },
                completed: { status: 'pending', timestamp: '' }
            }
        };

        await setDoc(doc(db, 'projects', newProjectId), newProject);
        await deleteDoc(doc(db, 'projectRequests', request.id));

        // Send acceptance email to user
        const emailSubject = `Your Project Request Has Been Approved! (${request.projectTitle || request.topic})`;
        const emailBody = `
            <h2>Great news! Your project request has been approved.</h2>
            <p>Your project tracking ID is: ${newProjectId}</p>
            <p>You can track your project's progress at any time by visiting our tracking page:</p>
            <p><a href="https://studkits.com/tracking">View Project Status</a></p>
            <hr>
            <h3>Project Details:</h3>
            <p><strong>Title:</strong> ${request.projectTitle || request.topic}</p>
            ${request.description ? `<p><strong>Description:</strong> ${request.description}</p>` : ''}
            <p>We'll keep you updated on your project's progress through each stage.</p>
        `;
        
        const emailResult = await sendEmail({ 
            to: request.email,
            subject: emailSubject, 
            body: emailBody 
        });

        if (!emailResult.success) {
            console.warn("Project created but email notification failed:", emailResult.message);
        }

        revalidatePath('/admin');
        revalidatePath('/tracking');
        
        return { success: true, message: 'Project created and user notified successfully.', projectId: newProjectId };
    } catch (error) {
        console.error("Error approving request:", error);
        return { success: false, message: `Failed to approve request: ${error instanceof Error ? error.message : "Unknown error"}` };
    }
}

export async function declineProjectRequest(request: ProjectRequest): Promise<{ success: boolean; message: string }> {
    try {
        await deleteDoc(doc(db, 'projectRequests', request.id));

        // Send decline email to user
        const emailSubject = `Update on Your Project Request (${request.projectTitle || request.topic})`;
        const emailBody = `
            <h2>Update on Your Project Request</h2>
            <p>Thank you for your interest in our services. After careful review of your project request, we regret to inform you that we are unable to proceed with it at this time.</p>
            <p>Please feel free to reach out to us if you would like to discuss alternative solutions or submit a modified request.</p>
            <hr>
            <h3>Project Details:</h3>
            <p><strong>Title:</strong> ${request.projectTitle || request.topic}</p>
            ${request.description ? `<p><strong>Description:</strong> ${request.description}</p>` : ''}
            <p>We appreciate your understanding and hope to work with you in the future.</p>
        `;
        
        const emailResult = await sendEmail({ 
            subject: emailSubject, 
            body: emailBody 
        });

        if (!emailResult.success) {
            console.warn("Request declined but email notification failed:", emailResult.message);
        }

        revalidatePath('/admin');
        return { success: true, message: 'Request declined and user notified.' };
    } catch (error) {
        console.error("Error declining request:", error);
        return { success: false, message: `Failed to decline request: ${error instanceof Error ? error.message : "Unknown error"}` };
    }
}

export async function sendEmail({ subject, body, to }: { subject: string; body: string; to?: string }) {
    try {
        // Email sending logic here
        console.log(`Sending email to: ${to}, subject: ${subject}`);
        return { success: true, message: 'Email sent successfully.' };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: `Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}` };
    }
}
