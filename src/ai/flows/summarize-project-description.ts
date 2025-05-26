'use server';

/**
 * @fileOverview Summarizes a project description to extract key features and benefits.
 *
 * - summarizeProjectDescription - A function that summarizes the project description.
 * - SummarizeProjectDescriptionInput - The input type for the summarizeProjectDescription function.
 * - SummarizeProjectDescriptionOutput - The return type for the summarizeProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeProjectDescriptionInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The full description of the project to be summarized.'),
});
export type SummarizeProjectDescriptionInput = z.infer<typeof SummarizeProjectDescriptionInputSchema>;

const SummarizeProjectDescriptionOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the project description, highlighting key features and benefits.'),
});
export type SummarizeProjectDescriptionOutput = z.infer<typeof SummarizeProjectDescriptionOutputSchema>;

export async function summarizeProjectDescription(
  input: SummarizeProjectDescriptionInput
): Promise<SummarizeProjectDescriptionOutput> {
  return summarizeProjectDescriptionFlow(input);
}

const summarizeProjectDescriptionPrompt = ai.definePrompt({
  name: 'summarizeProjectDescriptionPrompt',
  input: {schema: SummarizeProjectDescriptionInputSchema},
  output: {schema: SummarizeProjectDescriptionOutputSchema},
  prompt: `Summarize the following project description, extracting the key features and benefits:\n\n{{{projectDescription}}}`,
});

const summarizeProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'summarizeProjectDescriptionFlow',
    inputSchema: SummarizeProjectDescriptionInputSchema,
    outputSchema: SummarizeProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await summarizeProjectDescriptionPrompt(input);
    return output!;
  }
);
