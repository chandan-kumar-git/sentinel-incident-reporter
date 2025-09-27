'use client';

import { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { type IncidentReport, type RiskLevel } from '@/lib/data';

const riskLevelColors: Record<RiskLevel, string> = {
  Critical: 'hsl(var(--chart-1))',
  High: 'hsl(var(--chart-2))',
  Medium: 'hsl(var(--chart-3))',
  Low: 'hsl(var(--chart-4))',
  Pending: 'hsl(var(--chart-5))',
};

export function IncidentRiskDistributionChart({ incidents }: { incidents: IncidentReport[] }) {
  const data = useMemo(() => {
    const riskCounts = incidents.reduce((acc, incident) => {
      acc[incident.riskLevel] = (acc[incident.riskLevel] || 0) + 1;
      return acc;
    }, {} as Record<RiskLevel, number>);

    return Object.entries(riskCounts).map(([name, value]) => ({ name: name as RiskLevel, value }));
  }, [incidents]);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
            contentStyle={{
              background: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Legend />
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={riskLevelColors[entry.name]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
