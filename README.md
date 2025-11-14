# 🏃 CSV Runner Dashboard

A modern, interactive dashboard for uploading and visualizing running data from CSV files. Built with Next.js, TypeScript, and Tailwind CSS, this application allows you to track running metrics across dates and individuals with beautiful charts and comprehensive statistics.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- **📂 CSV Upload & Validation**: Upload CSV files with automatic header and data type validation
- **📊 Interactive Charts**: 
  - Daily running totals (line chart)
  - Per-person running totals (bar chart)
- **📈 Comprehensive Metrics**:
  - Overall statistics (average, min, max, count)
  - Per-person statistics breakdown
- **📋 Raw Data Table**: View all uploaded data in a clean, organized table
- **🎯 Sample Data Loader**: Try it instantly with pre-loaded sample data
- **⚠️ Error Handling**: Clear validation messages for invalid CSV formats or data
- **💾 Client-Side Processing**: All data processing happens in-browser (no server required)
- **🎨 Modern UI**: Responsive design with Tailwind CSS and shadcn/ui components

## 🖼️ Screenshots

*(Note: Add screenshots of your dashboard here when deploying)*

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) with react-chartjs-2
- **CSV Parsing**: [PapaParse](https://www.papaparse.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/), Headless UI, Heroicons
- **Build Tool**: Turbopack

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or higher (recommended)
- **npm**: Version 10.x or higher (comes with Node.js)
- **Git**: For cloning the repository

Check your versions:
```bash
node --version  # Should be v20.x or higher
npm --version   # Should be 10.x or higher
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SagarBawanthade/CSV-Runner-Dashboard.git
cd CSV-Runner-Dashboard
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js, React, and React DOM
- TypeScript and type definitions
- Tailwind CSS
- Chart.js and related libraries
- PapaParse for CSV parsing
- UI component libraries

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
```

### 5. Start Production Server

```bash
npm start
```

## 📖 Usage Guide

### Uploading a CSV File

1. Click the **"Choose File"** button in the upload section
2. Select a CSV file from your computer with the required format
3. The dashboard will automatically parse and display your data

### Using Sample Data

Click the **"Load sample"** button to instantly see the dashboard in action with pre-loaded running data.

### CSV File Format

Your CSV file must follow this format:

#### Required Headers (case-insensitive)
- `date` - The date of the run
- `person` - Name of the runner
- `miles` - Distance run in miles

#### Example CSV:
```csv
date,person,miles
2025-11-01,Amit,3.2
2025-11-02,Sunita,5.0
2025-11-03,Amit,4.3
2025-11-04,Sunita,6.1
```

#### Data Requirements:
- **Date**: Any format parseable by JavaScript's `Date()` constructor (e.g., `YYYY-MM-DD`, `MM/DD/YYYY`)
  - Will be automatically normalized to `YYYY-MM-DD` format
- **Person**: Any text string (names, IDs, etc.)
- **Miles**: Must be a numeric value (integers or decimals)

#### Sample Data File
A sample CSV file is included in the repository at `/src/sample-data/sample.csv`

### Understanding the Dashboard

**Metrics Section**:
- **Overall**: Aggregated statistics for all runs
- **Per Person**: Individual statistics for each runner
  - Shows avg, min, max, and count for each person

**Charts Section**:
- **Daily Total (Line Chart)**: Shows the total miles run each day
- **Per Person (Bar Chart)**: Compares total miles run by each person

**Raw Data Table**:
- Displays all uploaded data in tabular format
- Sorted and formatted for easy viewing

## 📁 Project Structure

```
CSV-Runner-Dashboard/
├── public/              # Static assets (SVGs, images)
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── favicon.ico
│   │   ├── globals.css # Global styles
│   │   ├── layout.tsx  # Root layout component
│   │   └── page.tsx    # Main dashboard page
│   ├── components/     # React components
│   │   ├── Charts.tsx       # Chart components (Line & Bar)
│   │   ├── MetricsCard.tsx  # Statistics display
│   │   └── UploadCSV.tsx    # CSV upload handler
│   ├── lib/            # Utility functions
│   │   ├── csv.ts      # CSV parsing & validation
│   │   └── utils.ts    # Helper utilities
│   └── sample-data/    # Sample CSV files
│       └── sample.csv
├── .gitignore
├── components.json     # shadcn/ui configuration
├── eslint.config.mjs   # ESLint configuration
├── next.config.ts      # Next.js configuration
├── package.json
├── postcss.config.mjs  # PostCSS configuration
├── README.md
└── tsconfig.json       # TypeScript configuration
```

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the application for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

## 🚢 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SagarBawanthade/CSV-Runner-Dashboard)

Or manually:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

### Other Deployment Options

- **Netlify**: Connect your GitHub repo and deploy
- **GitHub Pages**: Use static export (`next export`)
- **Docker**: Containerize the application
- **Self-hosted**: Build and run on any Node.js server

## 🔐 Data Privacy

- All CSV processing happens **client-side** in your browser
- No data is sent to external servers
- No database or backend required
- Data is stored only in memory during the session

## 🎯 Assumptions & Limitations

- CSV headers must include `date`, `person`, `miles` (case-insensitive)
- Date values must be parseable by JavaScript's `Date()` constructor
- Miles values must be numeric (integers or decimals)
- All validation errors will be displayed to the user
- No authentication or persistent storage (client-side only)
- Data is cleared when the page is refreshed

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is created for educational/assignment purposes.

## 👨‍💻 Author

**Sagar Bawanthade**

- GitHub: [@SagarBawanthade](https://github.com/SagarBawanthade)

## 🙏 Acknowledgments

- Built as part of the CSV Runner Dashboard assignment
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Charts powered by [Chart.js](https://www.chartjs.org/)
- CSV parsing by [PapaParse](https://www.papaparse.com/)

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
