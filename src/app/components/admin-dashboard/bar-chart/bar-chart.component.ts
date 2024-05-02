import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent {
  quantity: number[] = [];
  name: string[] = [];
  barChartOptions: EChartsOption = {
    title: { text: 'Total Enquiries' },
    backgroundColor: '#ffffff',
    legend: {},
    tooltip: {},
    // dataZoom: {
    //   show: true,
    //   start: 80,
    //   type: 'inside',
    // },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        data: [120, 200, 150, 80, 70, 110, 130],
        //color: '#ffffff',
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
