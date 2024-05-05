import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../interface/Login';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(loginRequest: Login) {
    return this.http.post<any>(
      environment.API_BASE_URL + 'auth/login',
      loginRequest
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['admin/login']);
  }
}
