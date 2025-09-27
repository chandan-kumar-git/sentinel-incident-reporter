'use server';

import { redirect } from 'next/navigation';
import { addIncident, type IncidentReport, type IncidentType, type RiskLevel } from '@/lib/data';
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

// Mock AI responses for summary and mitigation steps
const getMockAIResponses = (riskLevel: RiskLevel, content: string, incidentType: IncidentType) => {
    const summary = `This is an AI-generated summary for a reported ${incidentType} with content "${content.substring(0, 50)}...". The determined risk level is ${riskLevel}. This incident requires immediate attention based on the analysis of its content and type.`;
    
    let mitigationSteps: string[] = [];

    switch(riskLevel) {
        case 'Critical':
            mitigationSteps = [
                "Isolate the affected system from the network immediately.",
                "Do not click any links or download any attachments.",
                "Report the incident to the IT security head office now.",
                "Preserve all evidence; do not turn off the machine."
            ];
            break;
        case 'High':
            mitigationSteps = [
                "Block the sender or the URL at the firewall.",
                "Scan the affected system for malware or vulnerabilities.",
                "Change any passwords that might have been compromised.",
                "Alert team members to be aware of similar threats."
            ];
            break;
        case 'Medium':
             mitigationSteps = [
                "Advise the user to be cautious with unsolicited messages.",
                "Verify the sender's identity through a separate, trusted channel.",
                "Monitor network traffic for any unusual activity from the source.",
            ];
            break;
        case 'Low':
            mitigationSteps = [
                "No immediate action is required.",
                "Educate the user on best security practices.",
                "Archive the report for future reference and trend analysis."
            ];
            break;
        default:
             mitigationSteps = ["Follow standard protocol for this risk level."];
    }
    
    return { summary, mitigationSteps };
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
    
    // Using mock AI responses
    const { summary, mitigationSteps } = getMockAIResponses(riskLevel, content, incidentType);

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
