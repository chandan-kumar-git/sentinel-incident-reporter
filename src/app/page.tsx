import { IncidentForm } from '@/components/incident-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck, Siren, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="animate-fade-in">
      <div className="container mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/22/Defence_Cyber_Agency.png" 
                  alt="Defence Cyber Agency Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">Defence Cyber Agency</span>
                  <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl font-headline">
                    Cyber Security Portal
                  </h1>
                </div>
              </div>
              <p className="text-xl text-muted-foreground">
                Your vigilance is our first line of defense. Report suspicious messages, URLs, or files for immediate analysis by Sentinel AI and help safeguard our digital infrastructure.
              </p>
            </div>
             <Alert variant="default" className="bg-accent/10 border-accent/20">
              <Siren className="h-5 w-5 !text-accent" />
              <AlertTitle className="font-bold text-accent">Vigilance is Key</AlertTitle>
              <AlertDescription className="text-accent-foreground/80">
                Timely reporting enables our AI systems to detect threats, neutralize attacks, and protect the entire organization. Every submission strengthens our collective security.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="p-4 rounded-lg bg-card/50 transition-transform transform hover:scale-105">
                    <ShieldCheck className="h-8 w-8 text-chart-2 mx-auto mb-2" />
                    <div className="text-3xl font-bold">1,204</div>
                    <p className="text-sm text-muted-foreground">Incidents Resolved</p>
                </div>
                <div className="p-4 rounded-lg bg-card/50 transition-transform transform hover:scale-105">
                    <Siren className="h-8 w-8 text-chart-1 mx-auto mb-2" />
                    <div className="text-3xl font-bold">12</div>
                    <p className="text-sm text-muted-foreground">Active Critical Threats</p>
                </div>
                <div className="p-4 rounded-lg bg-card/50 transition-transform transform hover:scale-105">
                    <TrendingUp className="h-8 w-8 text-chart-4 mx-auto mb-2" />
                    <div className="text-3xl font-bold">+15%</div>
                    <p className="text-sm text-muted-foreground">Reports This Week</p>
                </div>
            </div>
          </div>
          <div className="bg-card p-2 rounded-xl shadow-2xl shadow-primary/10 animate-fade-in-up [animation-delay:0.2s]">
            <IncidentForm />
          </div>
        </div>

      </div>
    </div>
  );
}
