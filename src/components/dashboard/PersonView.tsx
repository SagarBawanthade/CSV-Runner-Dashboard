// src/components/dashboard/PersonView.tsx

'use client';

import { Card } from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { RunnerData, PersonStats } from '@/src/types/runner';
import { getPersonRunsByDate } from '@/src/lib/statsCalculator';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PersonViewProps {
  data: RunnerData[];
  personStats: PersonStats[];
  selectedPerson: string;
  onPersonChange: (person: string) => void;
}

export function PersonView({
  data,
  personStats,
  selectedPerson,
  onPersonChange,
}: PersonViewProps) {
  const currentStats = personStats.find(p => p.person === selectedPerson);
  const personRuns = getPersonRunsByDate(data, selectedPerson);

  if (!currentStats) return null;

  return (
    <div className="space-y-6">
      {/* Person Selector */}
      <Card>
        <div className="p-6">
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Select Runner
          </label>
          <Select value={selectedPerson} onValueChange={onPersonChange}>
            <SelectTrigger className="w-full md:w-80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {personStats.map(person => (
                <SelectItem key={person.person} value={person.person}>
                  {person.person} ({person.totalMiles.toFixed(1)} miles)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Person Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-slate-600 mb-2">
              Total Miles
            </p>
            <p className="text-3xl font-bold text-slate-900">
              {currentStats.totalMiles.toFixed(2)}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-slate-600 mb-2">
              Average Miles
            </p>
            <p className="text-3xl font-bold text-slate-900">
              {currentStats.averageMiles.toFixed(2)}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-slate-600 mb-2">
              Min Miles
            </p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-slate-900">
                {currentStats.minMiles.toFixed(2)}
              </p>
              <Badge variant="secondary" className="gap-1">
                <TrendingDown className="w-3 h-3" />
              </Badge>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <p className="text-sm font-medium text-slate-600 mb-2">
              Max Miles
            </p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-slate-900">
                {currentStats.maxMiles.toFixed(2)}
              </p>
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="w-3 h-3" />
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Person Chart */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            {selectedPerson}'s Running Progress
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={personRuns}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                stroke="#64748b"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="miles"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 5 }}
                name="Miles"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Run History Table */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Run History ({currentStats.runCount} runs)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">
                    Miles
                  </th>
                </tr>
              </thead>
              <tbody>
                {personRuns.map((run, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm text-slate-900">
                      {new Date(run.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-900 text-right font-medium">
                      {run.miles.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}