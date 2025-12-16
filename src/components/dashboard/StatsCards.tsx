'use client';

import { Card } from '@/src/components/ui/card';
import { TrendingUp, Activity, Users, BarChart3 } from 'lucide-react';
import { OverallStats } from '@/src/types/runner';

interface StatsCardsProps {
  stats: OverallStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    {
      label: 'Total Miles',
      value: stats.totalMiles.toFixed(2),
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Average Miles',
      value: stats.averageMiles.toFixed(2),
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Total Runs',
      value: stats.totalRuns.toString(),
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      label: 'Unique Runners',
      value: stats.uniqueRunners.toString(),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, idx) => (
        <Card key={idx} className="hover:shadow-lg transition-shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`rounded-full p-3 ${item.bgColor}`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                {item.label}
              </p>
              <p className="text-3xl font-bold text-slate-900">{item.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}