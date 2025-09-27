'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { reportIncidentAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, FileUp, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const initialState = {
  message: '',
  errors: {},
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
  const [state, formAction] = useFormState(reportIncidentAction, initialState);
  const [incidentType, setIncidentType] = useState<'URL' | 'Text Message' | 'File Upload'>('URL');
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message && state.errors) {
      toast({
        variant: 'destructive',
        title: 'Submission Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Incident Report</CardTitle>
        <CardDescription>Fill in the details of the incident below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
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

          {state.message && !state.errors && (
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
  );
}
