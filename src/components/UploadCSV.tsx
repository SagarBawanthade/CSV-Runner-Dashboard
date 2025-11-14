'use client';
import Papa from 'papaparse';
import { useRef, useState } from 'react';
import { parseCsvRows } from '../lib/csv';

export default function UploadCSV({ onData, onError }: { onData:(rows:any[])=>void, onError:(msg:string)=>void }) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setLoading(true);
    Papa.parse(f, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const parsed = parseCsvRows(results.data as Papa.ParseResult<any>['data']);
          onData(parsed);
        } catch (err: any) {
          onError(err.message ?? 'Invalid CSV');
        } finally {
          setLoading(false);
        }
      },
      error: (err) => {
        setLoading(false);
        onError('CSV parse error: ' + err.message);
      }
    });
  }

  function handleSample() {
    const sample = `date,person,miles
2025-11-01,Amit,3.2
2025-11-02,Sunita,5
2025-11-04,Amit,4.3
2025-11-08,Sunita,6.1
`;
    // create blob and feed to parser
    const blob = new Blob([sample], { type: 'text/csv' });
    const file = new File([blob], 'sample.csv', { type: 'text/csv' });
    if (fileRef.current) {
      // trick: manually parse sample via Papa
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          try {
            const parsed = parseCsvRows(results.data as any);
            onData(parsed);
          } catch (err: any) {
            onError(err.message ?? 'Invalid sample CSV');
          }
        }
      });
    }
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <label className="block text-sm font-medium mb-2">Upload CSV (columns: date, person, miles)</label>
      <div className="flex gap-2">
        <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={handleFile} className="block" />
        <button type="button" onClick={handleSample} className="px-3 py-2 bg-slate-800 text-white rounded">Load sample</button>
      </div>
      <p className="text-xs text-slate-500 mt-2">CSV must have headers <code>date, person, miles</code>. Date format ISO (YYYY-MM-DD) or any parseable format. Miles must be numeric.</p>
      {loading && <div className="text-sm text-slate-500 mt-2">Parsing...</div>}
    </div>
  );
}
