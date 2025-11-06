
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { sendEmail } from './email';

export interface ProjectRequest {
  id: string; // Document ID from Firestore
  createdAt: string; // ISO 8601 format
  type: 'project' | 'presentation';

  // Common fields
  name: string;
  email: string;

  // For 'project' type
  projectTitle?: string;
  microcontroller?: string;
  components?: string;
  description?: string;
  budget?: string;

  // For 'presentation' type
  topic?: string;
  audience?: string;
  purpose?: string;
  style?: string;
  instructions?: string;
}

interface RequestResult {
  success: boolean;
  message?: string;
  projectId?: string;
}

export async function approveProjectRequest(request: ProjectRequest): Promise<RequestResult> {
  try {
    // 1. Send approval email to user
    await sendEmail({
      to: request.email,
      subject: `Your ${request.type} request has been approved!`,
      text: `Dear ${request.name},\n\nYour request for ${request.type === 'project' ? request.projectTitle : request.topic} has been approved. We will contact you shortly with next steps.\n\nBest regards,\nStudKits Team`
    });

    // 2. Delete the request from Firestore
    const requestRef = doc(db, 'projectRequests', request.id);
    await deleteDoc(requestRef);

    return {
      success: true,
      projectId: request.id,
      message: 'Request approved successfully'
    };
  } catch (error) {
    console.error('Error approving request:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

export async function declineProjectRequest(request: ProjectRequest): Promise<RequestResult> {
  try {
    // 1. Send decline email to user
    await sendEmail({
      to: request.email,
      subject: `Update on your ${request.type} request`,
      text: `Dear ${request.name},\n\nUnfortunately, we are unable to proceed with your request for ${request.type === 'project' ? request.projectTitle : request.topic} at this time.\n\nBest regards,\nStudKits Team`
    });

    // 2. Delete the request from Firestore
    const requestRef = doc(db, 'projectRequests', request.id);
    await deleteDoc(requestRef);

    return {
      success: true,
      message: 'Request declined successfully'
    };
  } catch (error) {
    console.error('Error declining request:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
