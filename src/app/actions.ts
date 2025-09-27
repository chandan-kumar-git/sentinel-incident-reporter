'use server';

import { redirect } from 'next/navigation';
import { addIncident, updateIncidentStatus, type IncidentReport, type IncidentType, type RiskLevel } from '@/lib/data';
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


// This function uses mock data generation for a stable demo experience.
const getAIResponses = async (riskLevel: RiskLevel, content: string, incidentType: IncidentType) => {
    
    // 1. Generate a mock summary
    const summary = `This is a mock AI summary for a ${riskLevel} risk incident of type ${incidentType}. The content reported was: "${content.substring(0, 50)}...". Analysis indicates a potential threat that requires review.`;
    
    // 2. Generate mock mitigation steps
    let mitigationSteps: string[] = [];
    switch(riskLevel) {
        case 'Critical':
            mitigationSteps = [
                "Mock: Isolate the affected system from the network immediately.",
                "Mock: Do not click any links or download any attachments.",
                "Mock: Report the incident to the IT security head office now.",
                "Mock: Preserve all evidence; do not turn off the machine."
            ];
            break;
        case 'High':
            mitigationSteps = [
                "Mock: Block the sender or the URL at the firewall.",
                "Mock: Scan the affected system for malware or vulnerabilities.",
                "Mock: Change any passwords that might have been compromised.",
            ];
            break;
        case 'Medium':
             mitigationSteps = [
                "Mock: Advise the user to be cautious with unsolicited messages.",
                "Mock: Verify the sender's identity through a separate, trusted channel.",
            ];
            break;
        case 'Low':
            mitigationSteps = [
                "Mock: No immediate action is required.",
                "Mock: Archive the report for future reference and trend analysis."
            ];
            break;
        default:
             mitigationSteps = ["Mock: Follow standard protocol for this risk level."];
    }
    
    // Add one AI-like suggestion for variety
    mitigationSteps.push("Mock AI Suggestion: Consider running a network-wide scan for similar patterns.");
    
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
      data: null,
    };
  }

  const { content, incidentType } = validatedFields.data;

  try {
    const riskLevel = determineRiskLevel(content, incidentType);
    
    // Using reliable mock responses
    const { summary, mitigationSteps } = await getAIResponses(riskLevel, content, incidentType);

    const newIncident: Omit<IncidentReport, 'id' | 'timestamp' | 'reporterId' | 'events'> = {
      incidentType,
      content,
      riskLevel,
      status: 'Analyzed',
      mitigationSteps: mitigationSteps,
      summary: summary
    };

    const savedIncident = await addIncident(newIncident);

    return {
      message: 'Submission successful!',
      errors: {},
      data: savedIncident,
    }

  } catch (e) {
    console.error(e);
    return {
      message: 'An unexpected error occurred. Please try again.',
      errors: {},
      data: null,
    };
  }
}


export async function getAdditionalMitigation(incident: IncidentReport) {
    try {
        // Using the real AI flow for suggestions on-demand
        const aiSuggestions = await suggestMitigationSteps({
            incidentType: incident.incidentType,
            content: incident.content,
            riskLevel: incident.riskLevel,
            initialMitigationSteps: incident.mitigationSteps,
        });
        return aiSuggestions.suggestedMitigationSteps;
    } catch (error) {
        console.error("AI suggestion failed:", error);
        // Fallback to mock data in case of an error
        return [
            "Mock Fallback: Perform a historical log review for similar IOCs.",
            "Mock Fallback: Implement stricter egress filtering rules on the firewall.",
            "Mock Fallback: Conduct a phishing awareness training session for the affected department."
        ];
    }
}


export async function isolateHostAction(incidentId: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        const updatedIncident = await updateIncidentStatus(incidentId, 'Contained', 'Host isolated by analyst.');
        if (!updatedIncident) {
            return { success: false, message: 'Incident not found.' };
        }
        return { success: true, incident: updatedIncident };
    } catch (error) {
        console.error("Failed to isolate host:", error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}
