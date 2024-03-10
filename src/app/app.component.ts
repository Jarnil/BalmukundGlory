import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'BalmukundGlory';

  constructor(private ngxService: NgxUiLoaderService) {
    this.ngxService.start();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.ngxService.stop();
  }
}
