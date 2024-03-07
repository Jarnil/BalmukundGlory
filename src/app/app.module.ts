import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutProjectComponent } from './components/about-project/about-project.component';
import { AmenitiesComponent } from './components/amenities/amenities.component';
import { EnquiryComponent } from './components/enquiry/enquiry.component';
import { FindUsComponent } from './components/find-us/find-us.component';

import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ScrollTopModule } from 'primeng/scrolltop';
import { OdometerComponent } from './components/odometer/odometer.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    ContactUsComponent,
    HeaderComponent,
    HomePageComponent,
    AboutUsComponent,
    FooterComponent,
    AboutProjectComponent,
    EnquiryComponent,
    AmenitiesComponent,
    FindUsComponent,
    OdometerComponent,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    SidebarModule,
    ImageModule,
    GalleriaModule,
    CarouselModule,
    CardModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    DividerModule,
    RadioButtonModule,
    ScrollTopModule,
  ],
})
export class AppModule {}
