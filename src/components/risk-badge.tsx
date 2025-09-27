import { Badge } from '@/components/ui/badge';
import { type RiskLevel } from '@/lib/data';
import { cn } from '@/lib/utils';

type RiskBadgeProps = {
  riskLevel: RiskLevel;
  className?: string;
};

export function RiskBadge({ riskLevel, className }: RiskBadgeProps) {
  const riskColorMap: Record<RiskLevel, string> = {
    Pending: 'bg-gray-400 text-white hover:bg-gray-500',
    Low: 'bg-green-600 text-white hover:bg-green-700',
    Medium: 'bg-yellow-500 text-black hover:bg-yellow-600',
    High: 'bg-orange-600 text-white hover:bg-orange-700',
    Critical: 'bg-red-700 text-white hover:bg-red-800',
  };

  return (
    <Badge className={cn('font-bold border-transparent', riskColorMap[riskLevel], className)}>
      {riskLevel}
    </Badge>
  );
}
