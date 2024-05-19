import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { CardModule } from 'primeng/card';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { DropdownModule } from 'primeng/dropdown';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryTableComponent } from './enquiry-table/enquiry-table.component';
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    EnquiryTableComponent,
    ChartsComponent,
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule,
    CardModule,
    DropdownModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class AdminDashboardModule {}
