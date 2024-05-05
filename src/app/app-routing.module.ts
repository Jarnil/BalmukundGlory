import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/admin-dashboard/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full' },
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'dashboard',
        loadChildren: () =>
          import(
            './components/admin-dashboard/admin-dashboard-routing.module'
          ).then((m) => m.AdminDashboardRoutingModule),
        canActivate: [authGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
