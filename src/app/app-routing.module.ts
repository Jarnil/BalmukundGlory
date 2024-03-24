import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/admin-dashboard/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  //{ path: '', component: HomePageComponent, pathMatch: 'full' },
  { path: 'admin', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
