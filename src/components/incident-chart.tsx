"use client"

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { type IncidentReport, type RiskLevel } from "@/lib/data"
import { format, subDays, startOfDay } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTheme } from 'next-themes';

const riskLevelColors: Record<RiskLevel, string> = {
    Critical: "hsl(var(--chart-1))",
    High: "hsl(var(--chart-2))",
    Medium: "hsl(var(--chart-3))",
    Low: "hsl(var(--chart-4))",
    Pending: "hsl(var(--chart-5))",
};


export function IncidentChart({ incidents }: { incidents: IncidentReport[] }) {
    const { theme } = useTheme();

    const data = useMemo(() => {
        const days = 7;
        const endDate = new Date();
        const startDate = subDays(endDate, days - 1);

        // Initialize date range with zero counts
        const dateRange: { [key: string]: any } = {};
        for (let i = 0; i < days; i++) {
            const date = format(subDays(endDate, i), 'MMM d');
            dateRange[date] = { date, Critical: 0, High: 0, Medium: 0, Low: 0, Pending: 0 };
        }

        // Aggregate incident data
        incidents.forEach(incident => {
            const incidentDate = startOfDay(new Date(incident.timestamp));
            if (incidentDate >= startDate && incidentDate <= endDate) {
                const dateKey = format(incidentDate, 'MMM d');
                if (dateRange[dateKey] && incident.riskLevel) {
                    dateRange[dateKey][incident.riskLevel]++;
                }
            }
        });

        return Object.values(dateRange).reverse();

    }, [incidents]);

    return (
        <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} allowDecimals={false} />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }}
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "var(--radius)",
                        }}
                    />
                    <Bar dataKey="Critical" stackId="a" fill={riskLevelColors.Critical} name="Critical" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="High" stackId="a" fill={riskLevelColors.High} name="High" />
                    <Bar dataKey="Medium" stackId="a" fill={riskLevelColors.Medium} name="Medium" />
                    <Bar dataKey="Low" stackId="a" fill={riskLevelColors.Low} name="Low" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}