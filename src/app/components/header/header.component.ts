import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  sidebarVisible: boolean = false;
  visible: boolean = false;
  isHeaderVisible = true;

  constructor() {}

  showDialog() {
    this.visible = true;
    this.sidebarVisible = false;
  }

  showSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  scrollToSection(sectionId: string) {
    const headerElement = document.querySelector('.nav-menu') as HTMLElement;
    const headerHeight = headerElement.offsetHeight;
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  }
}
