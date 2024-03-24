import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

class EnquiryData {
  name!: string;
  contact!: string;
  email!: string;
  occupation: string;
  address: string;
  requirements: Array<String>;

  constructor() {
    this.name = '';
    this.contact = '';
    this.occupation = '';
    this.email = '';
    this.address = '';
    this.requirements = [];
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
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.optionsArray = ['2BHK', '3BHK', 'SHOPS'];
    this.enquiryData = new EnquiryData();
  }

  addRemoveOptions(option: string) {
    let requirements = this.enquiryData.requirements;
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

  isEmailInvalid() {
    if (this.enquiryData.name == '' && this.isSubmit) return true;
    return false;
  }

  isContactInvalid() {
    if (this.enquiryData.name == '' && this.isSubmit) return true;
    return false;
  }

  validateData() {
    if (
      this.enquiryData.name == '' ||
      this.enquiryData.contact == '' ||
      this.enquiryData.email == '' ||
      this.enquiryData.requirements.length <= 0 ||
      this.enquiryData.requirements.length > 3
    ) {
      return false;
    }
    return true;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.validateData()) {
      console.log('Form values:', this.enquiryData);
      // this.downloadBrochure();
      this.messageService.add({
        severity: 'success',
        summary: 'Brochure downloaded.',
        detail:
          'We appreciate your interest and will respond to your inquiry promptly.',
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Please fill out required fields.',
        detail: 'Name, Contact Number, Email And Requirement',
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
}
