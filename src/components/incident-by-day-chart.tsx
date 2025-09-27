'use client';

import { useMemo } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { type IncidentReport } from '@/lib/data';
import { format } from 'date-fns';

export function IncidentByDayChart({ incidents }: { incidents: IncidentReport[] }) {
  const data = useMemo(() => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayCounts = daysOfWeek.map(day => ({ subject: day, A: 0, fullMark: 0 }));

    let maxIncidents = 0;

    incidents.forEach(incident => {
      const dayOfWeek = format(new Date(incident.timestamp), 'E');
      const dayIndex = daysOfWeek.indexOf(dayOfWeek);
      if (dayIndex !== -1) {
        dayCounts[dayIndex].A++;
        if (dayCounts[dayIndex].A > maxIncidents) {
            maxIncidents = dayCounts[dayIndex].A;
        }
      }
    });

    dayCounts.forEach(day => {
        day.fullMark = Math.ceil(maxIncidents * 1.2); // Set fullMark to be slightly higher than max
    });

    return dayCounts;
  }, [incidents]);

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid strokeOpacity={0.3} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 14 }} />
          <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 5']} tick={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Radar name="Incidents" dataKey="A" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
