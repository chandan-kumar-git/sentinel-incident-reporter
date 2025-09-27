import { getIncidentById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { List, ShieldAlert, ArrowLeft, Clock, Info } from 'lucide-react';
import { RiskBadge } from '@/components/risk-badge';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { InteractiveMitigation } from '@/components/interactive-mitigation';
import { IncidentActions } from '@/components/incident-actions';
import { IncidentTimeline } from '@/components/incident-timeline';


export default async function IncidentDetailsPage({ params }: { params: { id: string } }) {
  const awaitedParams = await params;
  const incident = await getIncidentById(awaitedParams.id);

  if (!incident) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
       <div className="mb-4">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card className="w-full">
                <CardHeader>
                <CardTitle className="text-2xl">Incident Report Details</CardTitle>
                <CardDescription>Full report and analysis for incident ID: {incident.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="space-y-4 rounded-lg border bg-card p-6">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><Info /> Incident Information</h3>
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
                        <p className="text-sm font-medium text-muted-foreground">Reporter ID</p>
                        <p className="text-sm">{incident.reporterId}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Incident Type</p>
                        <Badge variant="outline">{incident.incidentType}</Badge>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                        <RiskBadge riskLevel={incident.riskLevel} />
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
                
                <div className="space-y-4 rounded-lg border bg-card p-6">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><ShieldAlert className="text-accent" /> AI Analysis & Recommendations</h3>
                    <Separator />
                    <div>
                        <h4 className="font-semibold flex items-center gap-2"><List /> AI Summary</h4>
                        <p className="mt-2 text-sm">{incident.summary}</p>
                    </div>
                    <Separator />
                    <InteractiveMitigation incident={incident} />
                </div>
                </CardContent>
            </Card>

            <IncidentActions incident={incident} />

        </div>
        <div className="lg:col-span-1">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Clock /> Incident Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <IncidentTimeline events={incident.events} />
                </CardContent>
             </Card>
        </div>

       </div>
    </div>
  );
}
