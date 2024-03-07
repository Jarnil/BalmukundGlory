import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  displayBasic: boolean = false;
  activeIndex: number = 0;
  images: string[] = [];
  lazyLoad: boolean = false;

  // images = [
  //   'assets/images/gallery/back_side_view.jpg',
  //   'assets/images/gallery/backside_corner_view.jpg',
  //   'assets/images/gallery/bird_eye_view.jpg',
  //   'assets/images/gallery/children_play_area_view.jpg',
  //   'assets/images/gallery/club_house_view.jpg',
  //   'assets/images/gallery/foyer_view.jpg',
  //   'assets/images/gallery/front_view_01.jpg',
  //   'assets/images/gallery/front_view_02.jpg',
  //   // 'assets/images/gallery/garden_club_view.jpg',
  //   // 'assets/images/gallery/gate_view.jpg',
  //   // 'assets/images/gallery/indoor game_view.jpg',
  //   // 'assets/images/gallery/left corner_view.jpg',
  //   // 'assets/images/gallery/left_side_view.jpg',
  //   // 'assets/images/gallery/living_dining_view.jpg',
  //   // 'assets/images/gallery/night_view.jpg',
  //   // 'assets/images/gallery/zula_court_view.jpg',
  // ];
  constructor(
    private http: HttpClient,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.fetchImagePaths();
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayBasic = true;
  }

  fetchImagePaths() {
    this.http.get<any>('assets/images.json').subscribe((data) => {
      this.images = data.images;
    });
  }
}
