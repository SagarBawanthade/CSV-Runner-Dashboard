
'use client';

import { Card } from '@/src/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { RunnerData, PersonStats } from '@/src/types/runner';
import { getRunsByDate } from '@/src/lib/statsCalculator';

interface OverallChartsProps {
  data: RunnerData[];
  personStats: PersonStats[];
}

export function OverallCharts({ data, personStats }: OverallChartsProps) {
  const runsByDate = getRunsByDate(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Miles Over Time */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Miles Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={runsByDate}>
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
              <Legend />
              <Line
                type="monotone"
                dataKey="totalMiles"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                name="Total Miles"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Top Runners */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Top Runners by Total Miles
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={personStats.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="person"
                tick={{ fontSize: 12 }}
                stroke="#64748b"
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar
                dataKey="totalMiles"
                fill="#10b981"
                name="Total Miles"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}