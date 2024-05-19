import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Sidebar } from 'primeng/sidebar';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ChangePassword, User, UserProfile } from '../../../interface/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  profileDialog: boolean = false;
  passwordDialog: boolean = false;
  isHeaderVisible = true;
  menuItems: MenuItem[] | undefined;
  userId!: any;
  username!: any;
  email!: any;
  oldPassword!: any;
  newPassword!: any;
  confirmPassword!: any;
  user!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.username = localStorage.getItem('userName');
    this.email = localStorage.getItem('email');
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.getUserDetails();
    this.menuItems = [
      {
        label: 'Profile',
        items: [
          {
            label: 'Update Profile',
            icon: 'pi pi-user',
            command: () => this.showProfileDialog(),
          },
          {
            label: 'Change Password',
            icon: 'pi pi-key',
            command: () => this.showPasswordDialog(),
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.authService.logout(),
          },
        ],
      },
    ];
  }

  getUserDetails(): void {
    this.userService.getUserDetails(this.userId).subscribe(
      (response) => {
        this.user = response;
      },
      (err) => {
        console.error('Error:', err);
        const errorMessage =
          err.error?.class?.message ||
          err.error?.message ||
          'An error occurred while getting user details!';
      }
    );
  }

  updateProfile() {
    let userProfileRequest: UserProfile = {
      userName: this.username,
      email: this.email,
    };
    this.userService.updateProfile(this.userId, userProfileRequest).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message,
        });
      },
      (err) => {
        console.error('Error:', err);
        const errorMessage =
          err.error?.class?.message ||
          err.error?.message ||
          'An error occurred while updating user profile!';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      }
    );
    this.profileDialog = false;
  }

  changePassword() {
    let changePasswordRequest: ChangePassword = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };

    if (this.newPassword !== this.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'New Password and Confirm Password does not match.',
      });
      return;
    }
    this.userService
      .changePassword(this.userId, changePasswordRequest)
      .subscribe(
        (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: response.message,
          });
          this.passwordDialog = false;
        },
        (err) => {
          console.error('Error:', err);
          const errorMessage =
            err.error?.class?.message ||
            err.error?.message ||
            'An error occurred while updating user profile!';
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });
        }
      );
  }

  showProfileDialog() {
    this.profileDialog = true;
  }

  showPasswordDialog() {
    this.passwordDialog = true;
  }
}
