'use server';
/**
 * @fileOverview A flow for sending emails.
 *
 * - sendEmail - A function that handles sending an email with the given subject and body.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as nodemailer from 'nodemailer';
import { SendEmailInputSchema, type SendEmailInput } from './send-email-types';


const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Cache the transporter
let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    pool: true, // Use pooled connections
    maxConnections: 5, // Maximum number of connections to make at once
    maxMessages: Infinity, // No limit on messages per connection
  });

  return cachedTransporter;
}

export async function sendEmail(input: SendEmailInput): Promise<{ success: boolean; message: string }> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (!navigator?.onLine) {
        throw new Error('No internet connection available');
      }

      const result = await Promise.race([
        sendEmailFlow(input),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        ),
      ]) as { success: boolean; message: string };

      if (result.success) {
        return result;
      }
      lastError = new Error(result.message);
    } catch (error) {
      lastError = error as Error;
      console.error(`Attempt ${attempt} failed:`, error);
      
      if (attempt < MAX_RETRIES) {
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

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: z.object({
        success: z.boolean(),
        message: z.string(),
    }),
  },
  async ({ subject, body }) => {
    // IMPORTANT: You must configure your email provider's SMTP settings in the .env file.
    // For example, for Gmail, you might need to create an "App Password".
    // See nodemailer documentation for more info: https://nodemailer.com/
    if (!process.env.EMAIL_HOST || process.env.EMAIL_HOST === 'smtp.example.com') {
      const message = "Email provider is not configured. Please update the .env file with your SMTP credentials.";
      console.error(message);
      return { success: false, message };
    }
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    try {
      await transporter.sendMail({
        from: `"StudKits Contact" <${process.env.EMAIL_USER}>`, // sender address
        to: "studkits25@gmail.com", // list of receivers
        subject: subject, // Subject line
        html: body, // html body
      });
      return { success: true, message: "Email sent successfully!" };
    } catch (error) {
      console.error("Failed to send email:", error);
      // In a real app, you might not want to expose detailed error messages to the client.
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      return { success: false, message: `Failed to send email: ${errorMessage}` };
    }
  }
);
