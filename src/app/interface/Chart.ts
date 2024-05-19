export interface ChartRequest {
  filterType: string;
  startDate: string;
  endDate: string;
}

export interface PieChartData {
  value: number;
  name: string;
}

export interface BarChartData {
  xAxisLabel: string;
  enquiries: number;
}
