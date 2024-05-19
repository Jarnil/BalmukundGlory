export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface UserProfile {
  userName: string;
  email: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}
