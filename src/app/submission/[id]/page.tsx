import { getIncidentById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { List, CheckCircle, ShieldAlert, ListChecks } from 'lucide-react';
import { RiskBadge } from '@/components/risk-badge';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default async function SubmissionPage({ params }: { params: { id: string } }) {
  const incident = await getIncidentById(params.id);

  if (!incident) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-2xl">Submission Successful</CardTitle>
          <CardDescription>Your incident report has been received and analyzed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4 rounded-lg border bg-card p-6">
            <h3 className="font-semibold text-lg">Incident Details</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Incident ID</p>
                <p className="font-mono text-sm">{incident.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                <p className="text-sm">{new Date(incident.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Incident Type</p>
                <Badge variant="outline">{incident.incidentType}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge variant="secondary">{incident.status}</Badge>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reported Content</p>
              <p className="mt-1 text-sm text-foreground break-words rounded-md bg-muted p-3 font-mono">{incident.content}</p>
            </div>
          </div>
          
          <Alert className="border-accent bg-accent/5">
            <ShieldAlert className="h-5 w-5 !text-accent" />
            <AlertTitle className="text-xl font-bold text-accent">Initial Analysis Result</AlertTitle>
            <AlertDescription className="mt-2 space-y-4">
              <div className="flex items-center gap-4 pt-2">
                <span className="font-semibold">Risk Level:</span>
                <RiskBadge riskLevel={incident.riskLevel} />
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2"><List /> AI Summary</h4>
                <p className="mt-2 text-sm">{incident.summary}</p>
              </div>
              <div>
                <h4 className="font-semibold flex items-center gap-2"><ListChecks /> Recommended Immediate Actions</h4>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  {incident.mitigationSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
            </AlertDescription>
          </Alert>

        </CardContent>
      </Card>
    </div>
  );
}
