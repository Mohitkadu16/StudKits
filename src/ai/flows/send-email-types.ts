/**
 * @fileOverview Defines the types for the send-email flow.
 *
 * - SendEmailInputSchema - The Zod schema for the sendEmail function input.
 * - SendEmailInput - The TypeScript type for the sendEmail function input.
 */

import { z } from 'zod';

export const SendEmailInputSchema = z.object({
  subject: z.string().describe('The subject of the email.'),
  body: z.string().describe('The HTML body of the email.'),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;
