# CSV Runner Dashboard (Next.js + Tailwind + shadcn/ui)

**What**: A small dashboard for uploading a CSV with columns `date, person, miles` and visualizing summary metrics and charts (overall + per-person).

**Built for:** CSV Runner Dashboard assignment.

---

## Project overview (which challenge, what you built)
This is a submission for the "CSV Runner Dashboard" assignment. It implements:
- CSV upload and validation (headers & types)
- Summary metrics (overall and per-person: avg, min, max, count)
- Charts: daily total line chart and per-person bar chart
- Raw data table and sample CSV loader
- Error handling for invalid CSVs and missing headers/values

---

## Assumptions
- CSV headers must include `date`, `person`, `miles` (case-insensitive).
- Date values must be parseable by `new Date(...)`. Stored/displayed as `YYYY-MM-DD`.
- Miles is numeric. Non-numeric miles will be rejected.
- No authentication or DB required for assignment (in-memory client-side).

---

## Prerequisites
- Node 20.x (recommended)
- npm
- Git

---

## Setup

### 1) Clone / New repo
```bash
git clone <your-github-repo-url> csv-runner-dashboard
cd csv-runner-dashboard
