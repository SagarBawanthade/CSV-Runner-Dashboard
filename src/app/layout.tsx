// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'CSV Runner Dashboard',
  description: 'Upload CSV with date, person, miles run and see metrics & charts',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-semibold">CSV Runner Dashboard</h1>
            <p className="text-sm text-slate-500">Upload CSV (date, person, miles) → metrics & charts</p>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="max-w-5xl mx-auto px-4 py-6 text-sm text-slate-500">
          Built for assignment — Sagar
        </footer>
      </body>
    </html>
  );
}
