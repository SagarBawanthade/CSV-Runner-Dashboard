import Papa from 'papaparse';
import { RunnerData, ValidationError, ParseResult } from '@/src/types/runner';

const REQUIRED_HEADERS = ['date', 'person', 'miles'];

export function parseCSV(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim().toLowerCase(),
      complete: (results) => {
        const validationResult = validateCSV(results.data as any[]);
        resolve(validationResult);
      },
      error: (error) => {
        resolve({
          data: [],
          errors: [{ row: 0, field: 'file', message: `Parse error: ${error.message}` }],
          isValid: false,
        });
      },
    });
  });
}

function validateCSV(rawData: any[]): ParseResult {
  const errors: ValidationError[] = [];
  const validData: RunnerData[] = [];

  if (rawData.length === 0) {
    errors.push({ row: 0, field: 'file', message: 'CSV file is empty' });
    return { data: [], errors, isValid: false };
  }

  // Check headers
  const headers = Object.keys(rawData[0]).map(h => h.trim().toLowerCase());
  const missingHeaders = REQUIRED_HEADERS.filter(h => !headers.includes(h));
  
  if (missingHeaders.length > 0) {
    errors.push({
      row: 0,
      field: 'headers',
      message: `Missing required columns: ${missingHeaders.join(', ')}. Expected: date, person, miles`,
    });
    return { data: [], errors, isValid: false };
  }

  // Validate each row
  rawData.forEach((row, index) => {
    const rowNumber = index + 2; // +2 because index is 0-based and we skip header row
    const rowErrors: string[] = [];

    // Validate date
    const dateStr = row.date?.toString().trim();
    if (!dateStr) {
      rowErrors.push('date is missing');
    } else {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        rowErrors.push(`date "${dateStr}" is invalid (use YYYY-MM-DD format)`);
      }
    }

    // Validate person
    const person = row.person?.toString().trim();
    if (!person) {
      rowErrors.push('person is missing');
    }

    // Validate miles
    const milesStr = row.miles?.toString().trim();
    if (!milesStr) {
      rowErrors.push('miles is missing');
    } else {
      const miles = parseFloat(milesStr);
      if (isNaN(miles)) {
        rowErrors.push(`miles "${milesStr}" is not a valid number`);
      } else if (miles < 0) {
        rowErrors.push('miles cannot be negative');
      }
    }

    if (rowErrors.length > 0) {
      errors.push({
        row: rowNumber,
        field: 'multiple',
        message: rowErrors.join(', '),
      });
    } else {
      validData.push({
        date: dateStr,
        person: person,
        miles: parseFloat(milesStr),
      });
    }
  });

  return {
    data: validData,
    errors,
    isValid: errors.length === 0,
  };
}