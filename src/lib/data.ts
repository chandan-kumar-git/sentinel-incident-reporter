export type RiskLevel = 'Pending' | 'Low' | 'Medium' | 'High' | 'Critical';

export type IncidentStatus = 'Submitted' | 'Analyzed' | 'Escalated' | 'Resolved';

export type IncidentType = 'URL' | 'Text Message' | 'File Upload';

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
};

// In-memory database
const incidents: IncidentReport[] = [
    { id: 'c7c8c9b4-7d5a-4e8a-8e2a-3b5a4f6d7e8c', timestamp: '2024-07-28T10:00:00Z', incidentType: 'Text Message', content: 'URGENT: Your account has a security alert. Click here to verify your password now: http://bit.ly/secure-account-now', reporterId: 'U-101', riskLevel: 'Critical', status: 'Escalated', mitigationSteps: ["Do not click any links.", "Report this to your unit supervisor immediately.", "Disconnect the device from the network."], summary: 'A critical phishing attempt via text message requires immediate attention.' },
    { id: 'd8d9dae5-8e6b-5f9b-9f3b-4c6b5g7e8f9d', timestamp: '2024-07-28T09:30:00Z', incidentType: 'URL', content: 'https://malicious-site.com/login.html', reporterId: 'U-202', riskLevel: 'High', status: 'Analyzed', mitigationSteps: ["Block the URL at the network firewall.", "Scan affected systems for malware."], summary: 'A suspicious URL was reported, likely a phishing site.' },
    { id: 'e9eafbe6-9f7c-6gac-af4c-5d7c6h8f9gad', timestamp: '2024-07-28T08:00:00Z', incidentType: 'File Upload', content: 'invoice_final.exe', reporterId: 'U-303', riskLevel: 'High', status: 'Analyzed', mitigationSteps: ["Isolate the file in a sandbox environment.", "Analyze file behavior and extract indicators of compromise."], summary: 'A suspicious executable file was uploaded, disguised as an invoice.' },
    { id: 'fagb0cf7-ag8d-7hbd-bg5d-6e8d7i9gahbe', timestamp: '2024-07-27T18:45:00Z', incidentType: 'URL', content: 'http://example-rewards.com', reporterId: 'U-101', riskLevel: 'Medium', status: 'Resolved', mitigationSteps: ["Educate user about identifying suspicious domains."], summary: 'A medium-risk URL, likely spam.' },
    { id: 'gbhcadf8-bh9e-8ice-ch6e-7f9e8jagbcf', timestamp: '2024-07-27T15:20:00Z', incidentType: 'Text Message', content: 'Hi, can you check this link? It looks interesting. [some-short-url]', reporterId: 'U-404', riskLevel: 'Medium', status: 'Analyzed', mitigationSteps: ["Advise reporter to be cautious of unsolicited links."], summary: 'Unsolicited text message with a shortened URL.' },
    { id: 'hcidbe09-ciad-9jdf-dig7-8gah9kbhcdg', timestamp: '2024-07-27T11:55:00Z', incidentType: 'URL', content: 'www.random-news-site.net', reporterId: 'U-505', riskLevel: 'Low', status: 'Resolved', mitigationSteps: ["No immediate action required."], summary: 'Low-risk URL, appears to be a standard news website.' },
    { id: 'idjebf1a-djbe-akdg-ejh8-9hbiakcidhe', timestamp: '2024-07-27T10:10:00Z', incidentType: 'Text Message', content: 'Your package is out for delivery.', reporterId: 'U-202', riskLevel: 'Low', status: 'Resolved', mitigationSteps: ["No action needed."], summary: 'Benign notification message.' },
    { id: 'jekfcg2b-ekcf-blfh-fki9-ajcjbldjief', timestamp: '2024-07-26T22:00:00Z', incidentType: 'File Upload', content: 'project_plan_v2.docx', reporterId: 'U-303', riskLevel: 'Low', status: 'Analyzed', mitigationSteps: ["Confirm file origin with sender if unsure."], summary: 'Standard document file upload.' },
    { id: 'kflgdh3c-flcg-cmgi-glja-bkdkcmejkgf', timestamp: '2024-07-26T17:30:00Z', incidentType: 'URL', content: 'https://known-partner-site.com/portal', reporterId: 'U-606', riskLevel: 'Low', status: 'Resolved', mitigationSteps: ["No action required."], summary: 'URL belongs to a known and trusted partner.' },
    { id: 'lgmhef4d-gmdh-dnhj-hmkb-cldldnfkglh', timestamp: '2024-07-26T14:00:00Z', incidentType: 'URL', content: 'http://unverified-source.org/download.zip', reporterId: 'U-707', riskLevel: 'Medium', status: 'Analyzed', mitigationSteps: ["Warn user against downloading files from unverified sources."], summary: 'URL points to a direct download from an unverified source.' },
    { id: 'mhnifg5e-hnie-eoik-inlc-dmemenghmhi', timestamp: '2024-07-26T12:15:00Z', incidentType: 'Text Message', content: 'Congratulations! You have won a prize. Claim it now at fake-prize.com', reporterId: 'U-808', riskLevel: 'High', status: 'Escalated', mitigationSteps: ["Block sender number.", "Add domain to blocklist."], summary: 'Classic prize scam message.' },
    { id: 'niojhg6f-iojf-fpjl-jomd-enfofohfnij', timestamp: '2024-07-25T16:40:00Z', incidentType: 'URL', content: 'https://corporate-webmail-login.info', reporterId: 'U-909', riskLevel: 'Critical', status: 'Escalated', mitigationSteps: ["Immediately reset passwords for any users who may have accessed the site.", "Block the domain across the entire network."], summary: 'A sophisticated phishing site impersonating corporate webmail.' },
    { id: 'ojpkgk7g-jpkg-gqkm-kpne-fogpgpigo-kj', timestamp: '2024-07-25T11:00:00Z', incidentType: 'Text Message', content: 'Meeting update: please see the attached document for the new agenda. http://short.url/agenda', reporterId: 'U-111', riskLevel: 'Medium', status: 'Analyzed', mitigationSteps: ["Verify the sender's identity through a separate communication channel before opening the link."], summary: 'An unsolicited message with a link, potentially spear-phishing.' },
    { id: 'pkqhlh8h-kqhl-hrln-lqof-gphqhqjhp-lk', timestamp: '2024-07-25T09:00:00Z', incidentType: 'File Upload', content: 'urgent_report.pdf.js', reporterId: 'U-222', riskLevel: 'High', status: 'Analyzed', mitigationSteps: ["Do not execute the file.", "Delete the file from the system.", "Run antivirus scan."], summary: 'A JavaScript file disguised as a PDF, indicating high risk of malicious script execution.' },
    { id: 'qlrimia9-lrim-isom-mrpg-hqirirkiq-ml', timestamp: '2024-07-24T18:00:00Z', incidentType: 'URL', content: 'https://google.com', reporterId: 'U-333', riskLevel: 'Low', status: 'Resolved', mitigationSteps: ["No action required."], summary: 'Benign, well-known URL reported, likely a false positive by the user.' },
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

export const addIncident = async (newIncidentData: Omit<IncidentReport, 'id' | 'timestamp' | 'reporterId'>): Promise<IncidentReport> => {
  const newIncident: IncidentReport = {
    ...newIncidentData,
    id: `INC-${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString(),
    reporterId: `U-${Math.floor(Math.random() * 900) + 100}`,
  };
  incidentStore.unshift(newIncident); // Add to the top of the list
  return newIncident;
};
