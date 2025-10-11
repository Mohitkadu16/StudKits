import { 
  collection,
  addDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sendEmail } from '@/lib/email';

const COLLECTION_NAME = 'troubleshootingRequests';

export interface TroubleshootingRequest {
  name: string;
  email: string;
  institution: string;
  projectCategory: string;
  projectSource: string;
  components: string;
  problemDescription: string;
  errorMessages?: string;
  expectedBehavior: string;
  troubleshootingSteps?: string;
  userId?: string;
  status?: string;
  timestamp?: string;
}

export async function createTroubleshootingRequest(data: TroubleshootingRequest) {
  try {
    // First save to Firebase
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      status: 'pending',
      timestamp: new Date().toISOString(),
    });

    // Then send email notification
    const emailContent = `
Thank you for submitting a troubleshooting request!

Reference ID: ${docRef.id}

Request Details:
---------------
Name: ${data.name}
Email: ${data.email}
Institution: ${data.institution}

Project Information:
------------------
Category: ${data.projectCategory}
Source: ${data.projectSource}
Components: ${data.components}

Problem Description:
------------------
${data.problemDescription}

Error Messages:
-------------
${data.errorMessages || 'None provided'}

Expected Behavior:
----------------
${data.expectedBehavior}

Troubleshooting Steps Tried:
--------------------------
${data.troubleshootingSteps || 'None provided'}

We will review your request and get back to you soon.

Best regards,
StudKits Support Team
    `;

    // Send via Formspree
    await sendEmail({
      to: data.email,
      subject: `Troubleshooting Request Confirmation - StudKits`,
      text: emailContent
    });

    // Send a copy to admin
    await sendEmail({
      to: 'studkits25l@gmail.com',
      subject: `New Troubleshooting Request from ${data.name}`,
      text: emailContent
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating troubleshooting request:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
