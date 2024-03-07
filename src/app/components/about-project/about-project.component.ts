import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-about-project',
  templateUrl: './about-project.component.html',
  styleUrl: './about-project.component.css',
})
export class AboutProjectComponent {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
