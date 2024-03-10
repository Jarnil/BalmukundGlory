import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'node:console';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css',
})
export class EnquiryComponent {
  visible: boolean = false;
  enquiryForm!: FormGroup;
  existingFileName: string = 'DemoSheet.xlsx';
  newFileName: string = 'DemoSheet_NEW.xlsx';
  fileName: string = 'DemoSheet.xlsx';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.enquiryForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      occupation: [''],
      address: [''],
      requirements: this.formBuilder.array([]),
    });
  }

  onSubmit() {
    if (this.enquiryForm.valid) {
      console.log('Form values:', this.enquiryForm.value);
      this.downloadBrochure();
    } else {
      let errors = this.getErrorMessage();
      let errorMessage = '';
      if (errors && errors.length > 0) {
        errors.forEach((error) => {
          errorMessage = errorMessage + '- ' + error + '\n';
        });
        alert(errorMessage);
      }
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

  updateRequirements(event: any, value: string) {
    const requirements = this.enquiryForm.get('requirements') as FormArray;

    if (event.target.checked) {
      requirements.push(this.formBuilder.control(value));
    } else {
      const index = requirements.value.indexOf(value);
      if (index !== -1) {
        requirements.removeAt(index);
      }
    }
  }

  getErrorMessage() {
    const errors = [];
    const nameControl = this.enquiryForm.get('name');
    const contactNumberControl = this.enquiryForm.get('contactNumber');
    const emailControl = this.enquiryForm.get('email');

    if (nameControl?.invalid) {
      errors.push('Name is required');
    }
    if (contactNumberControl?.invalid) {
      errors.push('Contact Number is required');
    }
    if (emailControl?.invalid) {
      if (emailControl?.errors?.['required']) {
        errors.push('Email is required');
      }
      if (emailControl?.errors?.['email']) {
        errors.push('Invalid email format');
      }
    }

    return errors;
  }
}
