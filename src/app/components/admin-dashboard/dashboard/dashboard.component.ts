import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../../../services/dashboard.service';
import { PieChartData } from '../../../interface/Chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  totalEnquiries!: number;
  twoBhkCount!: number;
  threeBhkCount!: number;
  shopsCount!: number;
  pieChartData: PieChartData[] = [];
  pieChartOptions!: EChartsOption;
  request = {
    startDate: new Date('2024-04-01T17:46:05.285Z'),
    endDate: new Date('2024-04-29T17:46:05.285Z'),
  };
  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getChartData();
    this.getEnquiriesData();
  }

  getEnquiriesData() {
    this.dashboardService.getEnquiries(this.request).subscribe(
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

  getChartData() {
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
        text: 'Enquiries',
      },
      backgroundColor: '#ffffff',
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Requirements',
          type: 'pie',
          // radius: [40, 200],
          center: ['50%', '50%'],
          label: {
            show: false,
          },
          animationType: 'scale',
          animationEasing: 'cubicOut',
          emphasis: {
            label: {
              formatter: '{b}: {d}',
            },
            itemStyle: {
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
          },
          left: '15%',
          data: this.pieChartData, // Assign data here
        },
      ],
    };
  }
}
