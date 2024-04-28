import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import { RouterModule } from '@angular/router';
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

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ScrollTopModule } from 'primeng/scrolltop';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { DividerModule } from 'primeng/divider';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
} from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { TokenService } from './services/token.service';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './components/admin-dashboard/login/login.component';
import { AdminDashboardModule } from './components/admin-dashboard/admin-dashboard.module';

const ngxUILoaderConfig: NgxUiLoaderConfig = {
  fastFadeOut: true,
  fgsColor: '#142d4c',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'three-bounce',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: 'assets/images/logo/Balmukund_Logo.png',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: '#142d4c',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};

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
    LoginComponent,
  ],
  providers: [
    provideClientHydration(),
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true,
    },
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GalleriaModule,
    CarouselModule,
    ScrollTopModule,
    AnimateOnScrollModule,
    DividerModule,
    CheckboxModule,
    SharedModule,
    NgxUiLoaderModule.forRoot(ngxUILoaderConfig),
    NgxUiLoaderRouterModule,
    AdminDashboardModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
