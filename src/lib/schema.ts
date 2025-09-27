import { z } from 'zod';

export const reportIncidentSchema = z.object({
  incidentType: z.enum(['URL', 'Text Message', 'File Upload']),
  content: z.string().min(10, { message: 'Please provide a detailed description.' }),
});
