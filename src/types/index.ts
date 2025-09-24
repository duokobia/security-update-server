export interface ConflictData {
  id: string;
  zone: string;
  country: string;
  conflictType: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Critical';
  startDate: string;
  description: string;
  casualties?: number;
}

export interface TimeSeriesData {
  date: string;
  'Middle East': number;
  'Europe': number;
  'Asia Pacific': number;
  'Africa': number;
  'Americas': number;
  'Global': number;
}

export interface BarChartData {
  zone: string;
  conflicts: number;
  casualties: number;
  averageIntensity: number;
}