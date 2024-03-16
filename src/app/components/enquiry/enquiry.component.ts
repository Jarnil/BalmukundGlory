import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css',
})
export class EnquiryComponent {
  visible: boolean = false;
  enquiryForm!: FormGroup;
  requirements: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.enquiryForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      occupation: [''],
      address: [''],
      requirements: [[], Validators.minLength(1)],
    });
  }

  onSubmit() {
    this.enquiryForm.markAllAsTouched();
    this.enquiryForm.updateValueAndValidity();
    if (this.enquiryForm.valid) {
      console.log('Form values:', this.enquiryForm.value);
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
        detail: 'Name, Contact Number, Email, Requirement',
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
