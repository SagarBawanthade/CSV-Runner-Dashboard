'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import { Button } from '@/src/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { parseCSV } from '@/src/lib/csvParser';
import { calculateOverallStats, calculatePersonStats } from '@/src/lib/statsCalculator';
import { RunnerData, ValidationError } from '@/src/types/runner';
import { FileUpload } from './FileUpload';
import { ErrorDisplay } from './ErrorDisplay';
import { StatsCards } from './StatsCards';
import { OverallCharts } from './OverallCharts';
import { PersonView } from './PersonView';

export function Dashboard() {
  const [data, setData] = useState<RunnerData[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setErrors([]);

    try {
      const result = await parseCSV(file);

      if (result.isValid && result.data.length > 0) {
        setData(result.data);
        const personStats = calculatePersonStats(result.data);
        if (personStats.length > 0) {
          setSelectedPerson(personStats[0].person);
        }
      } else {
        setErrors(result.errors);
        setData([]);
      }
    } catch (error) {
      setErrors([
        {
          row: 0,
          field: 'file',
          message: 'Failed to process file. Please ensure it is a valid CSV.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setData([]);
    setErrors([]);
    setSelectedPerson('');
  };

  const overallStats = calculateOverallStats(data);
  const personStats = calculatePersonStats(data);
  const hasData = data.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                CSV Runner Dashboard
              </h1>
              <p className="text-slate-600">
                Upload your running data to visualize and analyze performance
              </p>
            </div>
            {hasData && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="gap-2 self-start md:self-auto"
              >
                <RotateCcw className="w-4 h-4" />
                Upload New File
              </Button>
            )}
          </div>
        </div>

        {/* Error Display */}
        {errors.length > 0 && (
          <div className="mb-8">
            <ErrorDisplay errors={errors} />
          </div>
        )}

        {/* File Upload or Dashboard */}
        {!hasData ? (
          <FileUpload onFileSelect={handleFileSelect} isLoading={isLoading} />
        ) : (
          <div className="space-y-8">
            {/* Overall Stats */}
            <StatsCards stats={overallStats} />

            {/* Tabs for Different Views */}
            <Tabs defaultValue="overall" className="w-full">
              <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 mb-6">
                <TabsTrigger value="overall">Overall View</TabsTrigger>
                <TabsTrigger value="person">Per-Person View</TabsTrigger>
              </TabsList>

              <TabsContent value="overall" className="space-y-6">
                <OverallCharts data={data} personStats={personStats} />
              </TabsContent>

              <TabsContent value="person">
                <PersonView
                  data={data}
                  personStats={personStats}
                  selectedPerson={selectedPerson}
                  onPersonChange={setSelectedPerson}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}