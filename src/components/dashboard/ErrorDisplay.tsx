
'use client';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';
import { Card } from '@/src/components/ui/card';
import { ValidationError } from '@/src/types/runner';

interface ErrorDisplayProps {
  errors: ValidationError[];
}

export function ErrorDisplay({ errors }: ErrorDisplayProps) {
  if (errors.length === 0) return null;

  return (
    <Card className="border-red-200 bg-red-50">
      <div className="p-6">
        <Alert variant="destructive" className="border-0 bg-transparent p-0">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle className="text-lg font-semibold mb-3">
            Validation Errors Found
          </AlertTitle>
          <AlertDescription>
            <p className="text-sm mb-4">
              Please fix the following errors in your CSV file:
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {errors.map((error, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-red-200 rounded-md p-3 text-sm"
                >
                  <span className="font-semibold text-red-900">
                    Row {error.row}:
                  </span>{' '}
                  <span className="text-red-700">{error.message}</span>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}