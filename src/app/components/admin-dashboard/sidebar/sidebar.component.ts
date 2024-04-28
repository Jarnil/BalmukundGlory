import { Component, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

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
}
