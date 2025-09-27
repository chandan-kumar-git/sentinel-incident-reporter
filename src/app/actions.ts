'use server';

import { redirect } from 'next/navigation';
import { addIncident, type IncidentReport, type IncidentType, type RiskLevel } from '@/lib/data';
import { reportIncidentSchema } from '@/lib/schema';
import { summarizeIncidentReport } from '@/ai/flows/summarize-incident-report';
import { suggestMitigationSteps } from '@/ai/flows/suggest-mitigation-steps';

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

// This function now uses Genkit flows instead of mock data
const getAIResponses = async (riskLevel: RiskLevel, content: string, incidentType: IncidentType) => {
    
    // 1. Get AI-generated summary
    const summaryResponse = await summarizeIncidentReport({ incidentDetails: `Type: ${incidentType}, Content: ${content}` });
    const summary = summaryResponse.summary;
    
    // 2. Get initial mitigation steps based on risk level (can still be rule-based)
    let initialMitigationSteps: string[] = [];
    switch(riskLevel) {
        case 'Critical':
            initialMitigationSteps = [
                "Isolate the affected system from the network immediately.",
                "Do not click any links or download any attachments.",
                "Report the incident to the IT security head office now.",
                "Preserve all evidence; do not turn off the machine."
            ];
            break;
        case 'High':
            initialMitigationSteps = [
                "Block the sender or the URL at the firewall.",
                "Scan the affected system for malware or vulnerabilities.",
                "Change any passwords that might have been compromised.",
            ];
            break;
        case 'Medium':
             initialMitigationSteps = [
                "Advise the user to be cautious with unsolicited messages.",
                "Verify the sender's identity through a separate, trusted channel.",
            ];
            break;
        case 'Low':
            initialMitigationSteps = [
                "No immediate action is required.",
                "Archive the report for future reference and trend analysis."
            ];
            break;
        default:
             initialMitigationSteps = ["Follow standard protocol for this risk level."];
    }
    
    // 3. Get AI-suggested additional steps
    const suggestedStepsResponse = await suggestMitigationSteps({
      incidentType,
      content,
      riskLevel,
      initialMitigationSteps
    });

    const allMitigationSteps = [...initialMitigationSteps, ...suggestedStepsResponse.suggestedMitigationSteps];
    
    return { summary, mitigationSteps: allMitigationSteps };
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
    
    // Using real AI responses
    const { summary, mitigationSteps } = await getAIResponses(riskLevel, content, incidentType);

    const newIncident: Omit<IncidentReport, 'id' | 'timestamp' | 'reporterId'> = {
      incidentType,
      content,
      riskLevel,
      status: 'Analyzed',
      mitigationSteps: mitigationSteps,
      summary: summary
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
