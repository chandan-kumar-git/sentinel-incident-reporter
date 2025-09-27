import { IncidentForm } from '@/components/incident-form';

export default function Home() {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
          Cyber Incident Reporting Portal
        </h1>
        <p className="text-lg text-muted-foreground">
          Report suspicious messages, URLs, or files for analysis. Your diligence helps protect our networks.
        </p>
      </div>
      <div className="mt-12">
        <IncidentForm />
      </div>
    </div>
  );
}
