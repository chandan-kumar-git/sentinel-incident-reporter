'use server';

import { redirect } from 'next/navigation';
import { addIncident, type IncidentReport, type IncidentType, type RiskLevel } from '@/lib/data';
import { suggestMitigationSteps } from '@/ai/flows/suggest-mitigation-steps';
import { summarizeIncidentReport } from '@/ai/flows/summarize-incident-report';
import { reportIncidentSchema } from '@/lib/schema';

// Mock analysis function to determine risk level
const determineRiskLevel = (content: string, type: IncidentType): RiskLevel => {
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('password') || lowerContent.includes('urgent') || lowerContent.includes('bank') || lowerContent.includes('critical')) {
    return 'Critical';
  }
  if (lowerContent.includes('click here') || lowerContent.includes('verify')) {
    return 'High';
  }
  if (type === 'URL' || lowerContent.includes('http://') || lowerContent.includes('https://')) {
    return 'Medium';
  }
  if (type === 'File Upload') {
      return 'High';
  }
  return 'Low';
};

export async function reportIncidentAction(prevState: any, formData: FormData) {
  const validatedFields = reportIncidentSchema.safeParse({
    incidentType: formData.get('incidentType'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Error: Please check the form fields.',
    };
  }

  const { content, incidentType } = validatedFields.data;

  try {
    const riskLevel = determineRiskLevel(content, incidentType);
    
    // Using Genkit flows for summary and mitigation
    const [mitigationResponse, summaryResponse] = await Promise.all([
        suggestMitigationSteps({
            incidentType,
            content,
            riskLevel,
            initialMitigationSteps: [], // Start with no steps
        }),
        summarizeIncidentReport({
            incidentDetails: content
        })
    ]);

    const newIncident: Omit<IncidentReport, 'id' | 'timestamp' | 'reporterId'> = {
      incidentType,
      content,
      riskLevel,
      status: 'Analyzed',
      mitigationSteps: mitigationResponse.suggestedMitigationSteps.length > 0 ? mitigationResponse.suggestedMitigationSteps : ['Follow standard protocol for this risk level.'],
      summary: summaryResponse.summary
    };

    const savedIncident = await addIncident(newIncident);

    redirect(`/submission/${savedIncident.id}`);

  } catch (e) {
    console.error(e);
    return {
      message: 'An unexpected error occurred during analysis. Please try again.',
      errors: {},
    };
  }
}
