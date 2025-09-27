export type RiskLevel = 'Pending' | 'Low' | 'Medium' | 'High' | 'Critical';

export type IncidentStatus = 'Submitted' | 'Analyzed' | 'Escalated' | 'Resolved' | 'Contained';

export type IncidentType = 'URL' | 'Text Message' | 'File Upload';

export type IncidentEvent = {
  timestamp: string;
  description: string;
}

export type IncidentReport = {
  id: string;
  timestamp: string;
  incidentType: IncidentType;
  content: string;
  reporterId: string;
  riskLevel: RiskLevel;
  status: IncidentStatus;
  mitigationSteps: string[];
  summary: string;
  events: IncidentEvent[];
};

// In-memory database
const incidents: IncidentReport[] = [
    { id: 'c7c8c9b4-7d5a-4e8a-8e2a-3b5a4f6d7e8c', timestamp: '2024-07-28T10:00:00Z', incidentType: 'Text Message', content: 'URGENT: Your account has a security alert. Click here to verify your password now: http://bit.ly/secure-account-now', reporterId: 'U-101', riskLevel: 'Critical', status: 'Escalated', mitigationSteps: ["Do not click any links.", "Report this to your unit supervisor immediately.", "Disconnect the device from the network."], summary: 'A critical phishing attempt via text message requires immediate attention.', events: [{ timestamp: '2024-07-28T10:00:00Z', description: 'Incident Reported' }, { timestamp: '2024-07-28T10:01:15Z', description: 'AI analysis completed.' }] },
    { id: 'd8d9dae5-8e6b-5f9b-9f3b-4c6b5g7e8f9d', timestamp: '2024-07-28T09:30:00Z', incidentType: 'URL', content: 'https://malicious-site.com/login.html', reporterId: 'U-202', riskLevel: 'High', status: 'Analyzed', mitigationSteps: ["Block the URL at the network firewall.", "Scan affected systems for malware."], summary: 'A suspicious URL was reported, likely a phishing site.', events: [{ timestamp: '2024-07-28T09:30:00Z', description: 'Incident Reported' }] },
    { id: 'e9eafbe6-9f7c-6gac-af4c-5d7c6h8f9gad', timestamp: '2024-07-28T08:00:00Z', incidentType: 'File Upload', content: 'invoice_final.exe', reporterId: 'U-303', riskLevel: 'High', status: 'Analyzed', mitigationSteps: ["Isolate the file in a sandbox environment.", "Analyze file behavior and extract indicators of compromise."], summary: 'A suspicious executable file was uploaded, disguised as an invoice.', events: [{ timestamp: '2024-07-28T08:00:00Z', description: 'Incident Reported' }] },
    { id: 'fagb0cf7-ag8d-7hbd-bg5d-6e8d7i9gahbe', timestamp: '2024-07-27T18:45:00Z', incidentType: 'URL', content: 'http://example-rewards.com', reporterId: 'U-101', riskLevel: 'Medium', status: 'Resolved', mitigationSteps: ["Educate user about identifying suspicious domains."], summary: 'A medium-risk URL, likely spam.', events: [{ timestamp: '2024-07-27T18:45:00Z', description: 'Incident Reported' }] },
    { id: 'gbhcadf8-bh9e-8ice-ch6e-7f9e8jagbcf', timestamp: '2024-07-27T15:20:00Z', incidentType: 'Text Message', content: 'Hi, can you check this link? It looks interesting. [some-short-url]', reporterId: 'U-404', riskLevel: 'Medium', status: 'Analyzed', mitigationSteps: ["Advise reporter to be cautious of unsolicited links."], summary: 'Unsolicited text message with a shortened URL.', events: [{ timestamp: '2024-07-27T15:20:00Z', description: 'Incident Reported' }] },
    { id: 'hcidbe09-ciad-9jdf-dig7-8gah9kbhcdg', timestamp: '2024-07-27T11:55:00Z', incidentType: 'URL', content: 'www.random-news-site.net', reporterId: 'U-505', riskLevel: 'Low', status: 'Resolved', mitigationSteps: ["No immediate action required."], summary: 'Low-risk URL, appears to be a standard news website.', events: [{ timestamp: '2024-07-27T11:55:00Z', description: 'Incident Reported' }] },
    { id: 'idjebf1a-djbe-akdg-ejh8-9hbiakcidhe', timestamp: '2024-07-27T10:10:00Z', incidentType: 'Text Message', content: 'Your package is out for delivery.', reporterId: 'U-202', riskLevel: 'Low', status: 'Resolved', mitigationSteps: ["No action needed."], summary: 'Benign notification message.', events: [{ timestamp: '2024-07-27T10:10:00Z', description: 'Incident Reported' }] },
    { id: 'jekfcg2b-ekcf-blfh-fki9-ajcjbldjief', timestamp: '2024-07-26T22:00:00Z', incidentType: 'File Upload', content: 'project_plan_v2.docx', reporterId: 'U-303', riskLevel: 'Low', status: 'Analyzed', mitigationSteps: ["Confirm file origin with sender if unsure."], summary: 'Standard document file upload.', events: [{ timestamp: '2024-07-26T22:00:00Z', description: 'Incident Reported' }] },
    { id: 'kflgdh3c-flcg-cmgi-glja-bkdkcmejkgf', timestamp: '2024-07-26T17:30:00Z', incidentType: 'URL', content: 'https://known-partner-site.com/portal', reporterId: 'U-606', riskLevel: 'Low', status: 'Resolved', mitigationSteps: ["No action required."], summary: 'URL belongs to a known and trusted partner.', events: [{ timestamp: '2024-07-26T17:30:00Z', description: 'Incident Reported' }] },
    { id: 'lgmhef4d-gmdh-dnhj-hmkb-cldldnfkglh', timestamp: '2024-07-26T14:00:00Z', incidentType: 'URL', content: 'http://unverified-source.org/download.zip', reporterId: 'U-707', riskLevel: 'Medium', status: 'Analyzed', mitigationSteps: ["Warn user against downloading files from unverified sources."], summary: 'URL points to a direct download from an unverified source.', events: [{ timestamp: '2024-07-26T14:00:00Z', description: 'Incident Reported' }] },
    { id: 'mhnifg5e-hnie-eoik-inlc-dmemenghmhi', timestamp: '2024-07-26T12:15:00Z', incidentType: 'Text Message', content: 'Congratulations! You have won a prize. Claim it now at fake-prize.com', reporterId: 'U-808', riskLevel: 'High', status: 'Escalated', mitigationSteps: ["Block sender number.", "Add domain to blocklist."], summary: 'Classic prize scam message.', events: [{ timestamp: '2024-07-26T12:15:00Z', description: 'Incident Reported' }] },
    { id: 'niojhg6f-iojf-fpjl-jomd-enfofohfnij', timestamp: '2024-07-25T16:40:00Z', incidentType: 'URL', content: 'https://corporate-webmail-login.info', reporterId: 'U-909', riskLevel: 'Critical', status: 'Contained', mitigationSteps: ["Immediately reset passwords for any users who may have accessed the site.", "Block the domain across the entire network."], summary: 'A sophisticated phishing site impersonating corporate webmail.', events: [{ timestamp: '2024-07-25T16:40:00Z', description: 'Incident Reported' }, { timestamp: '2024-07-25T16:41:00Z', description: 'Host isolated by analyst.' }] },
    { id: 'ojpkgk7g-jpkg-gqkm-kpne-fogpgpigo-kj', timestamp: '2024-07-25T11:00:00Z', incidentType: 'Text Message', content: 'Meeting update: please see the attached document for the new agenda. http://short.url/agenda', reporterId: 'U-111', riskLevel: 'Medium', status: 'Analyzed', mitigationSteps: ["Verify the sender's identity through a separate communication channel before opening the link."], summary: 'An unsolicited message with a link, potentially spear-phishing.', events: [{ timestamp: '2024-07-25T11:00:00Z', description: 'Incident Reported' }] },
    { id: 'pkqhlh8h-kqhl-hrln-lqof-gphqhqjhp-lk', timestamp: '2024-07-25T09:00:00Z', incidentType: 'File Upload', content: 'urgent_report.pdf.js', reporterId: 'U-222', riskLevel: 'High', status: 'Analyzed', mitigationSteps: ["Do not execute the file.", "Delete the file from the system.", "Run antivirus scan."], summary: 'A JavaScript file disguised as a PDF, indicating high risk of malicious script execution.', events: [{ timestamp: '2024-07-25T09:00:00Z', description: 'Incident Reported' }] },
    { id: 'qlrimia9-lrim-isom-mrpg-hqirirkiq-ml', timestamp: '2024-07-24T18:00:00Z', incidentType: 'URL', content: 'https://google.com', reporterId: 'U-333', riskLevel: 'Low', status: 'Resolved', mitigationSteps: ["No action required."], summary: 'Benign, well-known URL reported, likely a false positive by the user.', events: [{ timestamp: '2024-07-24T18:00:00Z', description: 'Incident Reported' }] },
    { id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', timestamp: '2024-07-29T14:00:00Z', incidentType: 'File Upload', content: 'payroll_update.xlsm', reporterId: 'U-789', riskLevel: 'Critical', status: 'Escalated', mitigationSteps: ["Isolate the device immediately.", "Notify IT security department.", "Do not open the file under any circumstances."], summary: 'A macro-enabled Excel sheet which could contain malware.', events: [{ timestamp: '2024-07-29T14:00:00Z', description: 'Incident Reported' }] },
    { id: 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', timestamp: '2024-07-29T11:20:00Z', incidentType: 'Text Message', content: 'Your bank account has been frozen. Please call this number to unlock it: 1-800-FAKE-BANK', reporterId: 'U-456', riskLevel: 'High', status: 'Analyzed', mitigationSteps: ["Do not call the number.", "Contact the bank through official channels.", "Block the sender's number."], summary: 'A vishing (voice phishing) attempt via text message.', events: [{ timestamp: '2024-07-29T11:20:00Z', description: 'Incident Reported' }] },
    { id: 'c3d4e5f6-a7b8-9012-3456-7890abcdef23', timestamp: '2024-07-29T09:05:00Z', incidentType: 'URL', content: 'http://totally-legit-but-not-really.com/update-java', reporterId: 'U-123', riskLevel: 'High', status: 'Analyzed', mitigationSteps: ["Block the domain.", "Ensure all users have up-to-date Java versions from the official source."], summary: 'A fake Java update page, likely distributing malware.', events: [{ timestamp: '2024-07-29T09:05:00Z', description: 'Incident Reported' }] },
    { id: 'd4e5f6a7-b8c9-0123-4567-890abcdef345', timestamp: '2024-07-28T20:00:00Z', incidentType: 'File Upload', content: 'family_photo.jpg.vbs', reporterId: 'U-987', riskLevel: 'High', status: 'Analyzed', mitigationSteps: ["Delete the file.", "Run a full system scan."], summary: 'A VBScript file disguised as a JPEG image, which is a common malware technique.', events: [{ timestamp: '2024-07-28T20:00:00Z', description: 'Incident Reported' }] },
    { id: 'e5f6a7b8-c9d0-1234-5678-90abcdef4567', timestamp: '2024-07-28T16:15:00Z', incidentType: 'Text Message', content: 'We noticed unusual activity on your account. Was this you? [link-to-fake-login]', reporterId: 'U-654', riskLevel: 'Critical', status: 'Escalated', mitigationSteps: ["Do not click the link.", "Change your account password immediately through the official website.", "Enable two-factor authentication."], summary: 'A highly targeted phishing message designed to steal login credentials.', events: [{ timestamp: '2024-07-28T16:15:00Z', description: 'Incident Reported' }] },
    { id: 'a2b3c4d5-e6f7-8901-2345-67890abcdef12', timestamp: '2024-07-30T10:00:00Z', incidentType: 'URL', content: 'https://your-package-tracking.info/track?id=12345', reporterId: 'U-111', riskLevel: 'High', status: 'Analyzed', mitigationSteps: ["Do not enter any personal information.", "Verify the tracking number with the official carrier website.", "Block the domain."], summary: 'Fake package tracking website designed to steal personal information.', events: [{ timestamp: '2024-07-30T10:00:00Z', description: 'Incident Reported' }] },
    { id: 'b3c4d5e6-f7a8-9012-3456-7890abcdef234', timestamp: '2024-07-30T11:30:00Z', incidentType: 'Text Message', content: 'FINAL NOTICE: Your tax refund is pending. Click to claim: [malicious-link]', reporterId: 'U-222', riskLevel: 'Critical', status: 'Escalated', mitigationSteps: ["Report the message to the tax authorities.", "Delete the message.", "Block the sender."], summary: 'Tax refund scam, a common and dangerous form of phishing.', events: [{ timestamp: '2024-07-30T11:30:00Z', description: 'Incident Reported' }] },
    { id: 'c4d5e6f7-a8b9-0123-4567-890abcdef3456', timestamp: '2024-07-30T12:45:00Z', incidentType: 'File Upload', content: 'Security_Update.zip', reporterId: 'U-333', riskLevel: 'Critical', status: 'Analyzed', mitigationSteps: ["Do not open or extract the zip file.", "Delete the file immediately.", "Ensure your antivirus software is up to date."], summary: 'A zip file pretending to be a security update, likely containing malware.', events: [{ timestamp: '2024-07-30T12:45:00Z', description: 'Incident Reported' }] }
];

let incidentStore: IncidentReport[] = [...incidents];

// Data access functions
export const getIncidents = async (): Promise<IncidentReport[]> => {
  // Return a copy to avoid mutation
  return [...incidentStore].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getIncidentById = async (id: string): Promise<IncidentReport | undefined> => {
  return incidentStore.find((incident) => incident.id === id);
};

export const addIncident = async (newIncidentData: Omit<IncidentReport, 'id' | 'timestamp' | 'reporterId' | 'events'>): Promise<IncidentReport> => {
  const newIncident: IncidentReport = {
    ...newIncidentData,
    id: `INC-${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    reporterId: `U-${Math.floor(Math.random() * 900) + 100}`,
    events: [
      { timestamp: new Date().toISOString(), description: 'Incident Reported by user.' },
      { timestamp: new Date(Date.now() + 1000).toISOString(), description: 'AI analysis completed.' }
    ],
  };
  incidentStore.unshift(newIncident); // Add to the top of the list
  return newIncident;
};

export const updateIncidentStatus = async (id: string, status: IncidentStatus, eventDescription: string): Promise<IncidentReport | undefined> => {
    const incidentIndex = incidentStore.findIndex((incident) => incident.id === id);
    if (incidentIndex > -1) {
        incidentStore[incidentIndex].status = status;
        incidentStore[incidentIndex].events.push({
            timestamp: new Date().toISOString(),
            description: eventDescription,
        });
        return incidentStore[incidentIndex];
    }
    return undefined;
};
