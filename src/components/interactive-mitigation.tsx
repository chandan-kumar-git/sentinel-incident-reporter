'use client';

import { useState } from 'react';
import { type IncidentReport } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { ListChecks, Wand, Loader2, AlertTriangle } from 'lucide-react';
import { getAdditionalMitigation } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function InteractiveMitigation({ incident }: { incident: IncidentReport }) {
  const [mitigationSteps, setMitigationSteps] = useState<string[]>(incident.mitigationSteps);
  const [newSuggestions, setNewSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestSteps = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const suggestions = await getAdditionalMitigation(incident);
        setNewSuggestions(suggestions);
    } catch (e) {
      setError('Failed to get suggestions. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
            <h4 className="font-semibold flex items-center gap-2"><ListChecks /> Recommended Mitigation Steps</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {mitigationSteps.map((step, index) => (
                <li key={index}>{step}</li>
                ))}
            </ul>
        </div>
        <Button onClick={handleSuggestSteps} disabled={isLoading} size="sm">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand className="mr-2 h-4 w-4" />}
          Suggest Additional Steps
        </Button>
      </div>
      
      {isLoading && (
        <div className="mt-4 text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating enhanced recommendations with AI...
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {newSuggestions.length > 0 && (
         <Alert className="mt-4 border-accent bg-accent/5">
            <Wand className="h-5 w-5 !text-accent" />
            <AlertTitle className="font-bold text-accent">Enhanced AI Suggestions</AlertTitle>
            <AlertDescription>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                {newSuggestions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
                </ul>
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
