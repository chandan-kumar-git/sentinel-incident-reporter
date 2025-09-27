'use client';

import { useState, useMemo, useEffect } from 'react';
import { type IncidentReport, type RiskLevel } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RiskBadge } from './risk-badge';
import { AlertTriangle, ArrowUpDown, ShieldCheck, Siren, Settings } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IncidentChart } from './incident-chart';
import { ThemeSwitcher } from './theme-switcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const riskOrder: Record<RiskLevel, number> = {
  'Critical': 5,
  'High': 4,
  'Medium': 3,
  'Low': 2,
  'Pending': 1,
};

type SortKey = 'timestamp' | 'riskLevel';
type SortDirection = 'asc' | 'desc';

export function DashboardClient({ incidents }: { incidents: IncidentReport[] }) {
  const [sortBy, setSortBy] = useState<SortKey>('riskLevel');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  
  const initialSummaryStats = useMemo(() => {
    const total = incidents.length;
    const critical = incidents.filter(i => i.riskLevel === 'Critical').length;
    const pending = incidents.filter(i => i.status === 'Submitted' || i.status === 'Analyzed').length;
    return { total, critical, pending };
  }, [incidents]);

  const [summaryStats, setSummaryStats] = useState(initialSummaryStats);

  useEffect(() => {
    const interval = setInterval(() => {
      setSummaryStats(prevStats => ({
        total: prevStats.total + (Math.random() > 0.7 ? 1 : 0),
        critical: Math.max(0, prevStats.critical + (Math.random() > 0.9 ? 1 : (Math.random() > 0.8 ? -1 : 0))),
        pending: Math.max(0, prevStats.pending + (Math.random() > 0.6 ? 1 : (Math.random() > 0.5 ? -1 : 0))),
      }));
    }, 3000); // Fluctuate every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const filteredIncidents = useMemo(() => {
    return incidents.filter(incident => {
      if (riskFilter === 'all') return true;
      return incident.riskLevel.toLowerCase() === riskFilter;
    });
  }, [incidents, riskFilter]);

  const sortedIncidents = useMemo(() => {
    const sorted = [...filteredIncidents].sort((a, b) => {
      if (sortBy === 'riskLevel') {
        const aRisk = riskOrder[a.riskLevel];
        const bRisk = riskOrder[b.riskLevel];
        return aRisk - bRisk;
      }
      if (sortBy === 'timestamp') {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
      return 0;
    });

    if (sortDirection === 'desc') {
      return sorted.reverse();
    }
    return sorted;
  }, [filteredIncidents, sortBy, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortDirection('desc');
    }
  };
  
  return (
    <div className="space-y-8">
       <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"><Settings className="mr-2" /> Settings</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <div className="p-2">
                    <ThemeSwitcher />
                </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <Siren className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.critical}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.pending}</div>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Incident Trend (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <IncidentChart incidents={incidents} />
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
             <CardTitle>Incident Log</CardTitle>
              <div className="w-48">
                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger id="risk-filter" className="bg-card">
                    <SelectValue placeholder="Filter by risk..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk Levels</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Incident ID</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('timestamp')}>
                      Timestamp
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort('riskLevel')}>
                      Risk Level
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedIncidents.map((incident) => (
                  <TableRow key={incident.id}>
                    <TableCell className="font-mono text-xs">{incident.id.split('-')[0]}</TableCell>
                    <TableCell>{new Date(incident.timestamp).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{incident.incidentType}</Badge>
                    </TableCell>
                    <TableCell>
                      <RiskBadge riskLevel={incident.riskLevel} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{incident.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/incidents/${incident.id}`}>View Details</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
