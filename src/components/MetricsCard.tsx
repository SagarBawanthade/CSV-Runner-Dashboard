'use client';
import React from 'react';

function computeStats(data: Array<{date:string,person:string,miles:number}>) {
  if (!data || data.length === 0) return { avg: 0, min: 0, max: 0, count: 0 };
  const count = data.length;
  const sum = data.reduce((s, r) => s + r.miles, 0);
  const avg = sum / count;
  const min = Math.min(...data.map(r => r.miles));
  const max = Math.max(...data.map(r => r.miles));
  return { avg, min, max, count };
}

export default function MetricsCard({ title, data, perPerson }: { title: string, data: Array<any>, perPerson?: boolean }) {
  if (perPerson) {
    // group by person
    const byPerson = data.reduce((acc: any, r: any) => {
      acc[r.person] = acc[r.person] || [];
      acc[r.person].push(r);
      return acc;
    }, {});
    return (
      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-medium mb-2">Per person</h3>
        {Object.keys(byPerson).length === 0 && <div className="text-sm text-slate-500">No data</div>}
        <ul className="space-y-2">
          {Object.entries(byPerson).map(([person, rows]: any) => {
            const s = computeStats(rows);
            return (
              <li key={person} className="text-sm">
                <strong>{person}</strong> — avg {s.avg.toFixed(2)} | min {s.min} | max {s.max} | count {s.count}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const s = computeStats(data);
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="text-sm">
        <div>Count: {s.count}</div>
        <div>Average: {s.avg.toFixed(2)}</div>
        <div>Min: {s.min}</div>
        <div>Max: {s.max}</div>
      </div>
    </div>
  );
}
