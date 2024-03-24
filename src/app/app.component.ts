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
  isAdminPage: boolean = false;

  constructor(private ngxService: NgxUiLoaderService, private router: Router) {
    this.ngxService.start();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdminPage = event.url.includes('/admin');
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.ngxService.stop();
  }
}
