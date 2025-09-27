import { getIncidents } from '@/lib/data';
import { IncidentRiskDistributionChart } from '@/components/incident-risk-distribution-chart';
import { IncidentTypeDistributionChart } from '@/components/incident-type-distribution-chart';
import { IncidentByDayChart } from '@/components/incident-by-day-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function AnalysisPage() {
  const incidents = await getIncidents();

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Incident Analysis
        </h1>
        <p className="text-lg text-muted-foreground">
          A high-level overview of incident trends and patterns.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle>Incidents by Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <IncidentRiskDistributionChart incidents={incidents} />
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up [animation-delay:0.2s]">
          <CardHeader>
            <CardTitle>Incidents by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <IncidentTypeDistributionChart incidents={incidents} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="animate-fade-in-up [animation-delay:0.4s]">
          <CardHeader>
            <CardTitle>Incidents by Day of the Week</CardTitle>
          </CardHeader>
          <CardContent>
            <IncidentByDayChart incidents={incidents} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
