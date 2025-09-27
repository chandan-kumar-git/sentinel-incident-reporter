'use client';

import { useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { type IncidentReport, type IncidentType } from '@/lib/data';

const typeColors: Record<IncidentType, string> = {
    URL: 'hsl(var(--chart-1))',
    'Text Message': 'hsl(var(--chart-2))',
    'File Upload': 'hsl(var(--chart-3))',
};

export function IncidentTypeDistributionChart({ incidents }: { incidents: IncidentReport[] }) {
  const data = useMemo(() => {
    const typeCounts = incidents.reduce((acc, incident) => {
      acc[incident.incidentType] = (acc[incident.incidentType] || 0) + 1;
      return acc;
    }, {} as Record<IncidentType, number>);

    return Object.entries(typeCounts).map(([name, value]) => ({ name: name as IncidentType, value }));
  }, [incidents]);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis type="number" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} allowDecimals={false} />
          <YAxis type="category" dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} width={80} />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Bar dataKey="value" name="Incidents" barSize={40} radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={typeColors[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Re-exporting Cell for the Bar chart
import { Cell } from 'recharts';
