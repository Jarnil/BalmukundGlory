import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  sidebarVisible: boolean = false;
  visible: boolean = false;
  public name: string;
  public contactNumber: string;
  public email: string;
  lastScrollTop = 0;
  isHeaderVisible = true;

  constructor() {
    this.name = '';
    this.contactNumber = '';
    this.email = '';
  }

  // @HostListener('window:scroll')
  // onWindowScroll() {
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //   if (scrollTop > this.lastScrollTop) {
  //     // Scrolling down
  //     this.isHeaderVisible = false;
  //   } else {
  //     // Scrolling up
  //     this.isHeaderVisible = true;
  //   }
  //   this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  // }

  showDialog() {
    this.visible = true;
    this.sidebarVisible = false;
  }

  showSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  submit() {
    const scriptURL =
      'https://script.google.com/macros/s/AKfycbzFnwx06IhmDnsTd3X1l4r8YIbsKjakkhoDaOLeeADrEntemB8a4m5_ddzG8oeO0nqcqA/exec';
    const requestBody = {
      name: this.name,
      contactNumber: this.contactNumber,
      email: this.email,
      date: Date.now,
    };
    console.log(requestBody);

    // let requestBody = new FormData(form);
    //   fetch(scriptURL, { method: 'POST', body: requestBody })
    //     .then((response) => {
    //       alert('Success! :' + response);
    //     })
    //     .catch((error) => {
    //       alert('Error! :' + error.message);
    //     });
  }
}
