// app/page.tsx
'use client';
import { useState } from 'react';
import UploadCSV from '../components/UploadCSV';
import Charts from '../components/Charts';
import MetricsCard from '../components/MetricsCard';

export default function Page() {
  const [data, setData] = useState<Array<{date:string, person:string, miles:number}>>([]);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <UploadCSV onData={(rows) => { setData(rows); setError(null); }} onError={(e) => { setError(e); setData([]); }} />
      {error && <div className="p-4 border-l-4 border-red-500 bg-red-50 text-red-700">{error}</div>}

      <section>
        <h2 className="text-xl font-medium mb-4">Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricsCard title="Overall" data={data} />
          <MetricsCard title="Per Person" data={data} perPerson />
          <div className="p-4 bg-white rounded shadow">Use the charts below to explore trends.</div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Charts</h2>
        <Charts data={data} />
      </section>

      <section>
        <h2 className="text-xl font-medium mb-4">Raw data</h2>
        <div className="overflow-auto bg-white rounded shadow">
          <table className="min-w-full divide-y">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm">Date</th>
                <th className="px-4 py-2 text-left text-sm">Person</th>
                <th className="px-4 py-2 text-left text-sm">Miles</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2 text-sm">{r.date}</td>
                  <td className="px-4 py-2 text-sm">{r.person}</td>
                  <td className="px-4 py-2 text-sm">{r.miles}</td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-4 text-sm text-slate-500">No data — upload a CSV to begin.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
