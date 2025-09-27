'use client';

import { type IncidentEvent } from '@/lib/data';
import { CheckCircle, FileText, ServerOff, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';

const eventIcons: { [key: string]: React.ReactNode } = {
  default: <FileText className="h-5 w-5" />,
  reported: <FileText className="h-5 w-5 text-blue-500" />,
  analyzed: <ShieldAlert className="h-5 w-5 text-yellow-500" />,
  isolated: <ServerOff className="h-5 w-5 text-red-500" />,
  resolved: <CheckCircle className="h-5 w-5 text-green-500" />,
};

const getIconForEvent = (description: string) => {
    const lowerDesc = description.toLowerCase();
    if (lowerDesc.includes('reported')) return eventIcons.reported;
    if (lowerDesc.includes('analyzed')) return eventIcons.analyzed;
    if (lowerDesc.includes('isolated')) return eventIcons.isolated;
    if (lowerDesc.includes('resolved')) return eventIcons.resolved;
    return eventIcons.default;
}

export function IncidentTimeline({ events }: { events: IncidentEvent[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-4">
        No events recorded for this incident yet.
      </div>
    );
  }
  
  const sortedEvents = [...events].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-8">
      {sortedEvents.map((event, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
             <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                {getIconForEvent(event.description)}
            </span>
            {index < sortedEvents.length - 1 && (
              <div className="w-px h-8 bg-border"></div>
            )}
          </div>
          <div className="pt-2">
            <p className="font-semibold">{event.description}</p>
            <p className="text-sm text-muted-foreground">{format(new Date(event.timestamp), "MMM d, yyyy 'at' h:mm:ss a")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
