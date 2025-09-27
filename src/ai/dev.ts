import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-incident-report.ts';
import '@/ai/flows/suggest-mitigation-steps.ts';