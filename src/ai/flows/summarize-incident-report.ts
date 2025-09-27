// SummarizeIncidentReport.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing incident reports.
 *
 * - summarizeIncidentReport - A function that summarizes an incident report.
 * - SummarizeIncidentReportInput - The input type for the summarizeIncidentReport function.
 * - SummarizeIncidentReportOutput - The return type for the summarizeIncidentReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIncidentReportInputSchema = z.object({
  incidentDetails: z
    .string()
    .describe('The full details of the incident report to be summarized.'),
});
export type SummarizeIncidentReportInput = z.infer<
  typeof SummarizeIncidentReportInputSchema
>;

const SummarizeIncidentReportOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the incident report.'),
});
export type SummarizeIncidentReportOutput = z.infer<
  typeof SummarizeIncidentReportOutputSchema
>;

export async function summarizeIncidentReport(
  input: SummarizeIncidentReportInput
): Promise<SummarizeIncidentReportOutput> {
  return summarizeIncidentReportFlow(input);
}

const summarizeIncidentReportPrompt = ai.definePrompt({
  name: 'summarizeIncidentReportPrompt',
  input: {schema: SummarizeIncidentReportInputSchema},
  output: {schema: SummarizeIncidentReportOutputSchema},
  prompt: `You are an expert cybersecurity analyst tasked with summarizing incident reports for the CERT-Army team.

  Given the following incident report details, provide a concise summary that highlights the key information, potential risks, and recommended immediate actions. The summary should be no more than 200 words.

  Incident Details: {{{incidentDetails}}}`,
});

const summarizeIncidentReportFlow = ai.defineFlow(
  {
    name: 'summarizeIncidentReportFlow',
    inputSchema: SummarizeIncidentReportInputSchema,
    outputSchema: SummarizeIncidentReportOutputSchema,
  },
  async input => {
    const {output} = await summarizeIncidentReportPrompt(input);
    return output!;
  }
);
