import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css',
})
export class EnquiryComponent {
  visible: boolean = false;
  public name: string;
  public contactNumber: string;
  public email: string;
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.name = '';
    this.contactNumber = '';
    this.email = '';
  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      occupation: ['', Validators.required],
      address: ['', Validators.required],
      pizza: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
    }
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
