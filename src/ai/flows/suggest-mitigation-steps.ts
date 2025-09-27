'use server';

/**
 * @fileOverview Suggests additional mitigation steps based on incident details and risk level.
 *
 * - suggestMitigationSteps - A function that suggests mitigation steps.
 * - SuggestMitigationStepsInput - The input type for the suggestMitigationSteps function.
 * - SuggestMitigationStepsOutput - The return type for the suggestMitigationSteps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMitigationStepsInputSchema = z.object({
  incidentType: z.string().describe('The type of incident (e.g., URL, Text Message, File Upload).'),
  content: z.string().describe('The content of the incident (e.g., the URL or text message).'),
  riskLevel: z.string().describe('The initial risk level assigned to the incident (Low, Medium, High, Critical).'),
  initialMitigationSteps: z.array(z.string()).describe('The initial mitigation steps suggested.'),
});
export type SuggestMitigationStepsInput = z.infer<typeof SuggestMitigationStepsInputSchema>;

const SuggestMitigationStepsOutputSchema = z.object({
  suggestedMitigationSteps: z.array(z.string()).describe('A list of additional mitigation steps suggested by the AI.'),
});
export type SuggestMitigationStepsOutput = z.infer<typeof SuggestMitigationStepsOutputSchema>;

export async function suggestMitigationSteps(input: SuggestMitigationStepsInput): Promise<SuggestMitigationStepsOutput> {
  return suggestMitigationStepsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMitigationStepsPrompt',
  input: {schema: SuggestMitigationStepsInputSchema},
  output: {schema: SuggestMitigationStepsOutputSchema},
  prompt: `You are a cybersecurity expert providing enhanced mitigation steps for cyber incidents.

Based on the incident type, content, initial risk level, and provided mitigation steps, suggest additional mitigation steps to enhance the response strategy. Ensure the steps are practical and actionable.

Incident Type: {{{incidentType}}}
Content: {{{content}}}
Risk Level: {{{riskLevel}}}
Initial Mitigation Steps:
{{#each initialMitigationSteps}}
- {{{this}}}
{{/each}}

Suggest additional mitigation steps:
`,
});

const suggestMitigationStepsFlow = ai.defineFlow(
  {
    name: 'suggestMitigationStepsFlow',
    inputSchema: SuggestMitigationStepsInputSchema,
    outputSchema: SuggestMitigationStepsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
