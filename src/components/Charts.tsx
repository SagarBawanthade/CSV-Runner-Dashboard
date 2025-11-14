'use client';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as C, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
C.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function Charts({ data }: { data: Array<{date:string,person:string,miles:number}> }) {
  if (!data || data.length === 0) {
    return <div className="p-4 bg-white rounded shadow text-slate-500">No data to render charts.</div>;
  }

  // Overall time series: sum miles per date
  const perDate = data.reduce((acc: any, r) => {
    acc[r.date] = (acc[r.date] || 0) + r.miles;
    return acc;
  }, {});
  const dates = Object.keys(perDate).sort();
  const overallSeries = dates.map(d => perDate[d]);

  // Per person bar chart (total miles)
  const perPerson = data.reduce((acc: any, r) => {
    acc[r.person] = (acc[r.person] || 0) + r.miles;
    return acc;
  }, {});
  const persons = Object.keys(perPerson);
  const personsSeries = persons.map(p => perPerson[p]);

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: 'Total miles per day',
        data: overallSeries,
        tension: 0.3,
        fill: false,
      }
    ]
  };

  const barData = {
    labels: persons,
    datasets: [
      {
        label: 'Total miles per person',
        data: personsSeries
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <h4 className="font-medium mb-2">Daily total (line)</h4>
        <Line data={lineData} />
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h4 className="font-medium mb-2">Per person (bar)</h4>
        <Bar data={barData} />
      </div>
    </div>
  );
}
