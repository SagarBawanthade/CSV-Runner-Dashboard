'use client';

import { useRef } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function FileUpload({ onFileSelect, isLoading }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'text/csv') {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card
      className="border-2 border-dashed border-slate-300 hover:border-slate-400 transition-colors cursor-pointer"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <div className="p-12 flex flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-slate-100 p-4">
          <FileSpreadsheet className="w-12 h-12 text-slate-600" />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Upload CSV File
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Drop your CSV file here or click to browse
          </p>
          <p className="text-xs text-slate-500">
            Required columns: date, person, miles
          </p>
        </div>

        <Button disabled={isLoading} className="gap-2">
          <Upload className="w-4 h-4" />
          {isLoading ? 'Processing...' : 'Select CSV File'}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </Card>
  );
}