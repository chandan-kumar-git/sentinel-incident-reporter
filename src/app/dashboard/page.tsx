import { getIncidents } from '@/lib/data';
import { DashboardClient } from '@/components/dashboard-client';

export default async function DashboardPage() {
  const incidents = await getIncidents();
  
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          CERT-Army: Incident Triage Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Overview of all reported cyber incidents.
        </p>
      </div>
      <div className="mt-8">
        <DashboardClient incidents={incidents} />
      </div>
    </div>
  );
}
