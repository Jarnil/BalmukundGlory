export interface ChartRequest {
  filterType: string;
  startDate: Date;
  endDate: Date;
}
export interface PieChartData {
  value: number;
  name: string;
}
export interface BarChartData {
  xAxisLabel: string;
  enquiries: number;
}
