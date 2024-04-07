import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

class EnquiryData {
  name!: string;
  contactNumber!: string;
  email!: string;
  occupation: string;
  address: string;
  requirement: Array<String>;

  constructor() {
    this.name = '';
    this.contactNumber = '';
    this.occupation = '';
    this.email = '';
    this.address = '';
    this.requirement = [];
  }
}

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css',
})
export class EnquiryComponent {
  visible: boolean = false;
  optionsArray: Array<string> = [];
  public enquiryData!: EnquiryData;
  public isSubmit: boolean = false;

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.optionsArray = ['2BHK', '3BHK', 'SHOPS'];
    this.enquiryData = new EnquiryData();
  }

  addRemoveOptions(option: string) {
    let requirements = this.enquiryData.requirement;
    if (!requirements.includes(option)) {
      requirements.push(option);
    } else {
      let index = requirements.indexOf(option);
      requirements.splice(index, 1);
    }
  }

  isNameInvalid() {
    if (this.enquiryData.name == '' && this.isSubmit) return true;
    return false;
  }

  // isEmailInvalid() {
  //   if (this.enquiryData.email == '' && this.isSubmit) return true;
  //   return false;
  // }
  // isContactInvalid() {
  //   if (this.enquiryData.contactNumber == '' && this.isSubmit) return true;
  //   return false;
  // }

  isEmailInvalid() {
    if (this.isSubmit) {
      if (
        !this.enquiryData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      ) {
        return true;
      }
    }
    return false;
  }

  isContactInvalid() {
    if (this.isSubmit) {
      if (!this.enquiryData.contactNumber.match(/^\d{10}$/)) {
        return true;
      }
    }
    return false;
  }

  validateData() {
    if (
      this.enquiryData.name == '' ||
      this.enquiryData.contactNumber == '' ||
      this.enquiryData.email == '' ||
      this.enquiryData.requirement.length <= 0 ||
      this.enquiryData.requirement.length > 3
    ) {
      return false;
    }

    this.isEmailInvalid();
    this.isContactInvalid();

    return true;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.validateData()) {
      // this.downloadBrochure();
      var response = this.addEnquiry(this.enquiryData).subscribe(
        (response) => {
          console.log('Received response:', response);
          this.downloadBrochure();
          this.messageService.add({
            severity: 'success',
            summary: 'Brochure downloaded.',
            detail:
              'We appreciate your interest and will respond to your inquiry promptly.',
          });
        },
        (error) => {
          console.error('Error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error!',
            detail: 'Something went wrong while adding enquiry.',
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Please fill out required fields.',
        detail: 'Name, Contact Number, Email And Requirement',
        sticky: true,
      });
    }
  }

  downloadBrochure() {
    console.log('Downloading brochure...');
    const link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/brochure/BALMUKUND_GLORY_BROCHURE.pdf';
    link.download = 'BALMUKUND_GLORY_BROCHURE.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  addEnquiry(enquiry: EnquiryData): Observable<any> {
    return this.http.post<any>('https://localhost:7220/api/enquiry', enquiry);
  }
}
