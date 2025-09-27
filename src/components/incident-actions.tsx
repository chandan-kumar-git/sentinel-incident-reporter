'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ServerOff, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { isolateHostAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { type IncidentReport } from '@/lib/data';
import { useRouter } from 'next/navigation';


export function IncidentActions({ incident }: { incident: IncidentReport }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleIsolateHost = async () => {
    setIsLoading(true);
    const result = await isolateHostAction(incident.id);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: 'Action Successful',
        description: 'Host has been marked as contained.',
        variant: 'default',
      });
      router.refresh();
    } else {
      toast({
        title: 'Action Failed',
        description: result.message,
        variant: 'destructive',
      });
    }
  };
  
  const isContained = incident.status === 'Contained';

  return (
    <div className="rounded-lg border bg-card p-6">
        <h3 className="font-semibold text-lg flex items-center gap-2">Analyst Actions</h3>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isLoading || isContained}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ServerOff className="mr-2 h-4 w-4" />
                  )}
                  {isContained ? 'Host Already Contained' : 'Isolate Host'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will simulate isolating the host from the network. This is a critical step and should only be taken if you have confirmed the host is compromised.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleIsolateHost}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <p className="text-sm text-muted-foreground self-center">
                {isContained 
                    ? "This host has been contained and is no longer a threat."
                    : "Execute automated playbooks to contain the threat."
                }
            </p>
        </div>
    </div>
  );
}
