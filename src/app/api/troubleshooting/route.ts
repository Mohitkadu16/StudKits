import { NextResponse } from 'next/server';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sendEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

const troubleshootingSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  institution: z.string().max(200),
  projectCategory: z.string().max(100),
  projectSource: z.string().max(100),
  components: z.string().max(1000),
  problemDescription: z.string().min(1).max(5000),
  errorMessages: z.string().max(5000).optional(),
  expectedBehavior: z.string().min(1).max(5000),
  troubleshootingSteps: z.string().max(5000).optional(),
});

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const result = troubleshootingSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid payload', details: result.error.errors }, { status: 400 });
    }
    
    const data = result.data;

    // Save to Firebase
    const docRef = await addDoc(collection(db, 'troubleshooting-requests'), data);

    // Send confirmation email
    await sendEmail({
      to: data.email,
      subject: `Troubleshooting Request from ${data.name}`,
      text: `
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
      `
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
