import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'BalmukundGlory';
  pageType: number = 0;

  constructor(private ngxService: NgxUiLoaderService, private router: Router) {
    this.ngxService.start();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // this.pageType = event.url.includes('/admin');
        if (event.url.includes('/admin') && event.url.includes('/login')) {
          // For Admin Login Page
          this.pageType = 1;
        } else if (
          event.url.includes('/admin') &&
          event.url.includes('/dashboard')
        ) {
          // For Admin Dashboard Page
          this.pageType = 2;
        } else {
          this.pageType = 0;
        }
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.ngxService.stop();
  }
}
