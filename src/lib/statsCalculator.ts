import _ from 'lodash';
import { RunnerData, PersonStats, OverallStats } from '@/src/types/runner';

export function calculateOverallStats(data: RunnerData[]): OverallStats {
  if (data.length === 0) {
    return {
      totalMiles: 0,
      averageMiles: 0,
      minMiles: 0,
      maxMiles: 0,
      totalRuns: 0,
      uniqueRunners: 0,
    };
  }

  const miles = data.map(d => d.miles);
  const uniqueRunners = _.uniq(data.map(d => d.person)).length;

  return {
    totalMiles: _.sum(miles),
    averageMiles: _.mean(miles),
    minMiles: _.min(miles) || 0,
    maxMiles: _.max(miles) || 0,
    totalRuns: data.length,
    uniqueRunners,
  };
}

export function calculatePersonStats(data: RunnerData[]): PersonStats[] {
  const grouped = _.groupBy(data, 'person');

  return Object.entries(grouped).map(([person, runs]) => {
    const miles = runs.map(r => r.miles);
    
    return {
      person,
      totalMiles: _.sum(miles),
      averageMiles: _.mean(miles),
      minMiles: _.min(miles) || 0,
      maxMiles: _.max(miles) || 0,
      runCount: runs.length,
    };
  }).sort((a, b) => b.totalMiles - a.totalMiles);
}

export function getRunsByDate(data: RunnerData[]) {
  const grouped = _.groupBy(data, 'date');
  
  return Object.entries(grouped)
    .map(([date, runs]) => ({
      date,
      totalMiles: _.sum(runs.map(r => r.miles)),
      runCount: runs.length,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getPersonRunsByDate(data: RunnerData[], person: string) {
  const personRuns = data.filter(d => d.person === person);
  const grouped = _.groupBy(personRuns, 'date');
  
  return Object.entries(grouped)
    .map(([date, runs]) => ({
      date,
      miles: _.sum(runs.map(r => r.miles)),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}