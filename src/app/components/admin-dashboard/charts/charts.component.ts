import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DashboardService } from '../../../services/dashboard.service';
import { BarChartData, PieChartData } from '../../../interface/Chart';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
})
export class ChartsComponent {
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
  request = {
    filterType: 'LAST_6_MONTHS',
    startDate: new Date('2024-01-01T17:46:05.285Z'),
    endDate: new Date('2024-05-31T17:46:05.285Z'),
  };
  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.getPieChartData();
    this.getBarChartData();
    this.getEnquiriesData();
    this.primengConfig.ripple = true;
  }

  getEnquiriesData() {
    this.dashboardService.getEnquiriesCount(this.request).subscribe(
      (response) => {
        this.totalEnquiries = response.data.totalEnquiries;
        this.twoBhkCount = response.data.twoBhkCount;
        this.threeBhkCount = response.data.threeBhkCount;
        this.shopsCount = response.data.shopsCount;
        console.log(response);
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

  getPieChartData() {
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
      // dataZoom: {
      //   show: true,
      //   start: 80,
      //   type: 'inside',
      // },
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
