import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css',
})
export class AmenitiesComponent {
  amenities: any = [];
  responsiveOptions: any[] | undefined;
  constructor(private http: HttpClient, private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.fetchAminities();
    this.primengConfig.ripple = true;

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 5,
        numScroll: 5,
      },
      {
        breakpoint: '900px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '790px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '650px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '515px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  fetchAminities() {
    this.http.get<any>('assets/amenities.json').subscribe((data) => {
      this.amenities = data.amenities;
    });
  }
}
