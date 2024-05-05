import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryTableComponent } from './enquiry-table/enquiry-table.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'enquiries',
        component: EnquiryTableComponent,
      },
      {
        path: 'reports',
        component: ChartsComponent,
      },
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
