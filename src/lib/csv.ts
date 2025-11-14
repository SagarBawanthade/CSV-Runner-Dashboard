// lib/csv.ts
export function parseCsvRows(rows: any[]) {
  // Validate headers and types
  if (!Array.isArray(rows)) throw new Error('CSV parse returned unexpected data');

  const expected = ['date','person','miles'];
  // first row keys might tell us header names
  const first = rows[0];
  if (!first) return [];

  const keys = Object.keys(first).map(k => k.trim().toLowerCase());
  for (const h of expected) {
    if (!keys.includes(h)) {
      throw new Error(`Missing required header: ${h}`);
    }
  }

  const normalized = rows.map((r) => {
    const dateRaw = r['date'] ?? r['Date'] ?? r['DATE'];
    const personRaw = r['person'] ?? r['Person'] ?? r['PERSON'];
    const milesRaw = r['miles'] ?? r['Miles'] ?? r['MILES'];

    if (!dateRaw) throw new Error('Missing date value in one or more rows.');
    if (!personRaw) throw new Error('Missing person value in one or more rows.');
    if (milesRaw === undefined || milesRaw === null || milesRaw === '') throw new Error('Missing miles value in one or more rows.');

    const miles = Number(milesRaw);
    if (Number.isNaN(miles)) throw new Error(`Miles must be numeric. Found "${milesRaw}"`);

    // Normalize date to YYYY-MM-DD if possible
    const d = new Date(dateRaw);
    if (isNaN(d.getTime())) throw new Error(`Invalid date: ${dateRaw}`);
    const iso = d.toISOString().slice(0,10);

    return { date: iso, person: String(personRaw).trim(), miles };
  });

  return normalized;
}
