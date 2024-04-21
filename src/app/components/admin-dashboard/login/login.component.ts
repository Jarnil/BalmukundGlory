import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitted = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }

  OnSubmit() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      let loginRequest = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this.authService.login(loginRequest).subscribe(
        (response) => {
          console.log('Login response:', response);
          const email = response.data.email;
          const token = response.data.token;
          const userName = response.data.userName;
          localStorage.setItem('email', email);
          localStorage.setItem('token', token);
          localStorage.setItem('userName', userName);
          this.router.navigate(['admin/dashboard']);
          // this.adminService.isAdminPage = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          this.isLoading = false;
        },
        (err) => {
          console.error('Error:', err);
          const errorMessage =
            err.error?.class?.message ||
            err.error?.message ||
            'An error occurred while logging in. Please check the credentials and try again!';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });
        }
      );
    }
    this.isLoading = false;
  }

  onReset() {
    this.isSubmitted = false;
    this.loginForm.reset();
  }
}
