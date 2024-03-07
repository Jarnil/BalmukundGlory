import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  // { path: '', component: HomePageComponent, pathMatch: 'full' },
  // { path: 'gallery', component: GalleryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
