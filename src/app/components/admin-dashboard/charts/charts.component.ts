import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DashboardService } from '../../../services/dashboard.service';
import {
  BarChartData,
  ChartRequest,
  PieChartData,
} from '../../../interface/Chart';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
})
export class ChartsComponent {
  dateRange: Date[] | undefined;
  startDate!: string;
  endDate!: string;
  totalEnquiries!: number;
  twoBhkCount!: number;
  threeBhkCount!: number;
  shopsCount!: number;
  pieChartData: PieChartData[] = [];
  pieChartOptions!: EChartsOption;
  barChartData: BarChartData[] = [];
  xAxisLabel: string[] = [];
  enquiriesData: number[] = [];
  barChartOptions!: EChartsOption;
  dateFilters: any[] = [];
  selectedDateFilter: any;
  request!: ChartRequest;
  today = new Date();
  maxDate!: Date;

  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.selectedDateFilter = 'DATE';
    this.dateRange = [this.today, this.today];
    this.startDate = this.formatDate(this.today.toLocaleDateString());
    this.endDate = this.formatDate(this.today.toLocaleDateString(), true);
    this.updateDateRange();
    this.getEnquiriesData();
    this.primengConfig.ripple = true;
    this.maxDate = this.today;
  }

  updateDateRange() {
    if (this.dateRange && this.dateRange.length === 2) {
      const startDate = this.dateRange[0];
      const endDate = this.dateRange[1];

      const startUTC = Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      const endUTC = Date.UTC(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      );

      console.log('endUTC: ', endUTC);
      console.log('startUTC: ', startUTC);
      const daysDifference = Math.ceil(
        (endUTC - startUTC) / (1000 * 60 * 60 * 24)
      );

      if (daysDifference > 31) {
        this.selectedDateFilter = 'MONTH';
      }

      // Set start date and end date based on the selected range
      this.startDate = this.formatDate(startDate.toLocaleDateString());
      this.endDate = this.formatDate(endDate.toLocaleDateString(), true);
    } else {
      this.dateRange = [this.today, this.today];
      this.startDate = this.formatDate(this.today.toLocaleDateString());
      this.endDate = this.formatDate(this.today.toLocaleDateString(), true);
    }
  }

  formatDate(dateString: string, isEndDate = false) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = isEndDate ? '23' : '00';
    const minutes = isEndDate ? '59' : '00';
    const seconds = isEndDate ? '59' : '00';

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  onReset() {
    this.selectedDateFilter = 'DATE';
    this.dateRange = [this.today, this.today];
    this.startDate = this.formatDate(this.today.toLocaleDateString());
    this.endDate = this.formatDate(this.today.toLocaleDateString(), true);
    this.updateDateRange();
    this.getEnquiriesData();
  }

  getEnquiriesData() {
    this.updateDateRange();
    this.clearChartData(); // Clear existing chart data before fetching new data

    this.request = {
      filterType: this.selectedDateFilter,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.dashboardService.getEnquiriesCount(this.request).subscribe(
      (response) => {
        this.totalEnquiries = response.data.totalEnquiries;
        this.twoBhkCount = response.data.twoBhkCount;
        this.threeBhkCount = response.data.threeBhkCount;
        this.shopsCount = response.data.shopsCount;
        console.log(response);
        this.getBarChartData(); // Fetch bar chart data after getting the total enquiries data
        this.getPieChartData(); // Fetch pie chart data after getting the total enquiries data
      },
      (err) => {
        console.error('Error:', err);
        const errorMessage =
          err.error?.class?.message ||
          err.error?.message ||
          'An error occurred while getting chart data!';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      }
    );
  }

  clearChartData() {
    this.barChartData = [];
    this.enquiriesData = [];
    this.xAxisLabel = [];
  }

  getPieChartData() {
    // this.updateDateRange();

    this.request = {
      filterType: this.selectedDateFilter,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    this.dashboardService.getPieChartData(this.request).subscribe(
      (response) => {
        this.pieChartData = response.data;
        this.updatePieChartOptions();
        console.log(this.pieChartData);
      },
      (err) => {
        console.error('Error:', err);
        const errorMessage =
          err.error?.class?.message ||
          err.error?.message ||
          'An error occurred while getting chart data!';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      }
    );
  }

  updatePieChartOptions() {
    this.pieChartOptions = {
      title: {
        text: 'Property Enquiries Distribution',
        subtext: 'Breakdown of 2BHK, 3BHK, and Shop Enquiries',
        left: 'center',
      },
      color: ['#B180CE', '#8FD5F3', '#748EDE'],
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Requirements',
          type: 'pie',
          radius: '70%',
          top: 20,
          data: this.pieChartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  getBarChartData() {
    // this.updateDateRange();

    this.request = {
      filterType: this.selectedDateFilter,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.dashboardService.getBarChartData(this.request).subscribe(
      (response) => {
        this.barChartData = response.data;
        this.enquiriesData = this.getEnquiries();
        this.xAxisLabel = this.getXAxisLabels();
        this.updateBarChartOptions();
      },
      (err) => {
        console.error('Error:', err);
        const errorMessage =
          err.error?.class?.message ||
          err.error?.message ||
          'An error occurred while getting chart data!';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      }
    );
  }

  updateBarChartOptions() {
    const isEmptyData = this.enquiriesData.length === 0;

    // Define the graphic elements conditionally
    const graphicElements = isEmptyData
      ? [
          {
            type: 'text',
            left: 'center',
            top: 'middle',
            style: {
              text: 'No data found',
              fontSize: 25,
              fill: '#142D4C',
            },
            z: 100,
          },
        ]
      : [];

    this.barChartOptions = {
      title: {
        text: 'Total Enquiries Overview',
        subtext: 'Analysis of Overall Enquiry Activity',
        left: 'center',
      },
      legend: {
        left: 'left',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      xAxis: {
        data: this.xAxisLabel,
        axisLabel: {
          rotate: 90,
        },
        interval: 0,
      },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Enquiries',
          type: 'bar',
          data: this.enquiriesData,
          showBackground: true,
          barMaxWidth: '50%',
          label: {
            show: true,
          },
          colorBy: 'data',
          emphasis: {
            itemStyle: {
              shadowOffsetX: 2,
            },
          },
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      graphic: {
        elements: graphicElements,
      },
    };
  }

  getEnquiries(): number[] {
    for (const data of this.barChartData) {
      this.enquiriesData.push(data.enquiries);
    }
    return this.enquiriesData;
  }

  getXAxisLabels(): string[] {
    for (const data of this.barChartData) {
      this.xAxisLabel.push(data.xAxisLabel);
    }
    return this.xAxisLabel;
  }
}
