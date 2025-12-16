export interface RunnerData {
  date: string;
  person: string;
  miles: number;
}

export interface PersonStats {
  person: string;
  totalMiles: number;
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
  runCount: number;
}

export interface OverallStats {
  totalMiles: number;
  averageMiles: number;
  minMiles: number;
  maxMiles: number;
  totalRuns: number;
  uniqueRunners: number;
}

export interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export interface ParseResult {
  data: RunnerData[];
  errors: ValidationError[];
  isValid: boolean;
}