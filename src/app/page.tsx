import { IncidentForm } from '@/components/incident-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck, Siren, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
              Report a Cyber Incident
            </h1>
            <p className="text-xl text-muted-foreground">
              Your vigilance helps protect our networks. Report suspicious messages, URLs, or files for immediate analysis by Sentinel AI.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Incidents Resolved</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,204</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
                <Siren className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                 <p className="text-xs text-muted-foreground">Critical level</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reporting Trend</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+15%</div>
                 <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
           <Alert variant="default" className="bg-accent/10 border-accent/50 text-accent-foreground">
            <Siren className="h-5 w-5 !text-accent" />
            <AlertTitle className="font-semibold">Why Report?</AlertTitle>
            <AlertDescription>
              Timely reporting is crucial. It allows our AI-powered systems to detect patterns, neutralize threats, and protect the entire organization from potential cyber attacks. Every report matters.
            </AlertDescription>
          </Alert>
        </div>
        <div>
          <IncidentForm />
        </div>
      </div>
    </div>
  );
}
