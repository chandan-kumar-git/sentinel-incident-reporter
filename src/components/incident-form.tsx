'use client';

import { useFormStatus } from 'react-dom';
import { reportIncidentAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState, useActionState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, FileUp, Loader2, ShieldAlert, List, ListChecks, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { type IncidentReport } from '@/lib/data';
import { RiskBadge } from './risk-badge';
import { Separator } from './ui/separator';
import Link from 'next/link';

const initialState = {
  message: '',
  errors: {},
  data: null as IncidentReport | null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Analyze & Submit Report
    </Button>
  );
}

export function IncidentForm() {
  const [state, formAction] = useActionState(reportIncidentAction, initialState);
  const [incidentType, setIncidentType] = useState<'URL' | 'Text Message' | 'File Upload'>('URL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    if(pending) {
      setIsModalOpen(true);
    }

    if (state?.message && state.errors && Object.keys(state.errors).length > 0) {
      setIsModalOpen(false);
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: state.message,
      });
    }

    if (state?.message === 'Submission successful!' && state.data) {
       // Keep modal open, it will show data
    }

  }, [state, toast, pending]);
  
  const handleFormAction = (payload: FormData) => {
    setIsModalOpen(true);
    formAction(payload);
  }

  const closeModalAndReset = () => {
    setIsModalOpen(false);
    formRef.current?.reset();
    setIncidentType('URL');
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>New Incident Report</CardTitle>
          <CardDescription>Fill in the details of the incident below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={handleFormAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="incidentType">Incident Type</Label>
              <Select name="incidentType" value={incidentType} onValueChange={(value) => setIncidentType(value as any)}>
                <SelectTrigger id="incidentType">
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="URL">URL</SelectItem>
                  <SelectItem value="Text Message">Text Message</SelectItem>
                  <SelectItem value="File Upload">File Upload</SelectItem>
                </SelectContent>
              </Select>
              {state?.errors?.incidentType && <p className="text-sm font-medium text-destructive">{state.errors.incidentType[0]}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content / Description</Label>
              <Textarea
                id="content"
                name="content"
                placeholder={
                  incidentType === 'URL'
                    ? 'Paste the full suspicious URL here (e.g., https://example.com/phish)'
                    : incidentType === 'Text Message'
                    ? 'Paste the full suspicious text message here'
                    : 'Describe the file and how you received it.'
                }
                rows={6}
                className="resize-none"
              />
              {state?.errors?.content && <p className="text-sm font-medium text-destructive">{state.errors.content[0]}</p>}
            </div>

            {incidentType === 'File Upload' && (
              <div className="space-y-2">
                <Label htmlFor="file">File Upload</Label>
                <Input id="file" type="file" />
                <p className="text-sm text-muted-foreground">File upload functionality is for demonstration purposes and is not active.</p>
              </div>
            )}

            {state.message && state.errors && Object.keys(state.errors).length === 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg" onInteractOutside={(e) => { e.preventDefault(); }}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {state.data ? <CheckCircle className="text-green-600" /> : <Loader2 className="animate-spin" />}
              {state.data ? 'Analysis Complete' : 'Analyzing Incident...'}
            </DialogTitle>
            <DialogDescription>
              {state.data ? 'Your report has been submitted and analyzed.' : 'Please wait while we analyze your submission.'}
            </DialogDescription>
          </DialogHeader>
          
          {state.data ? (
            <div className="space-y-4 py-4">
              <Alert className="border-accent bg-accent/5">
                <ShieldAlert className="h-5 w-5 !text-accent" />
                <AlertTitle className="font-bold text-accent">Initial Analysis</AlertTitle>
                <AlertDescription className="mt-2 space-y-4">
                  <div className="flex items-center gap-4 pt-2">
                    <span className="font-semibold">Risk Level:</span>
                    <RiskBadge riskLevel={state.data.riskLevel} />
                  </div>
                  <div>
                    <h4 className="font-semibold flex items-center gap-2"><List /> AI Summary</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{state.data.summary}</p>
                  </div>
                   <Separator />
                  <div>
                    <h4 className="font-semibold flex items-center gap-2"><ListChecks /> Recommended Actions</h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                      {state.data.mitigationSteps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          ) : (
             <div className="flex justify-center items-center h-48">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
             </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
             <Button variant="outline" onClick={closeModalAndReset}>
              Report Another Incident
            </Button>
            <Button asChild disabled={!state.data}>
                <Link href={state.data ? `/submission/${state.data.id}` : '#'}>View Full Report</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
