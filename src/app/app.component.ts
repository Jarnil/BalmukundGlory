import { Component } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BalmukundGlory';

  constructor(private ngxService: NgxUiLoaderService) {}

  ngOnInit() {
    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 5000);
  }
}
