'use server';

import * as nodemailer from 'nodemailer';
import { SendEmailInputSchema, type SendEmailInput } from './send-email-types';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Create a single transporter instance
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'studkits25@gmail.com',
    pass: 'qjic fxab xshw shma',
  },
  pool: true,
  maxConnections: 5,
  maxMessages: Infinity,
  // Add debug option to see what's happening
  logger: true,
  debug: true
});

// Verify the connection configuration at startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

export async function sendEmail(input: SendEmailInput): Promise<{ success: boolean; message: string }> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempt ${attempt} to send email...`);
      
      await transporter.sendMail({
        from: '"StudKits Contact" <studkits25@gmail.com>',
        to: 'studkits25@gmail.com',
        subject: input.subject,
        html: input.body,
      });

      console.log('Email sent successfully!');
      return { success: true, message: 'Email sent successfully!' };

    } catch (error) {
      lastError = error as Error;
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (attempt < MAX_RETRIES) {
        console.log(`Waiting ${RETRY_DELAY * attempt}ms before retry...`);
        await sleep(RETRY_DELAY * attempt);
        continue;
      }
    }
  }
  
  return {
    success: false,
    message: `Failed after ${MAX_RETRIES} attempts. Last error: ${lastError?.message || 'Unknown error'}`,
  };
}

// End of file
