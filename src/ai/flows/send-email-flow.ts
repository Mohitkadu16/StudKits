
'use server';
/**
 * @fileOverview A flow for sending emails.
 *
 * - sendEmail - A function that handles sending an email with the given subject and body.
 * - SendEmailInput - The input type for the sendEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as nodemailer from 'nodemailer';

export const SendEmailInputSchema = z.object({
  subject: z.string().describe('The subject of the email.'),
  body: z.string().describe('The HTML body of the email.'),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

export async function sendEmail(input: SendEmailInput): Promise<{ success: boolean; message: string }> {
  return sendEmailFlow(input);
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
