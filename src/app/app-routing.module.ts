import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/admin-dashboard/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DashboardComponent } from './components/admin-dashboard/dashboard/dashboard.component';

const routes: Routes = [
  //{ path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
