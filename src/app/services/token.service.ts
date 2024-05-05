import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  private tokenExpired(token: any) {
    if (!token) {
      return false;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    try {
      const expiry = JSON.parse(atob(base64)).exp;
      return Math.floor(new Date().getTime() / 1000) >= expiry;
    } catch (error) {
      console.error('Error decoding or parsing the token:', error);
      return false;
    }
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    if (token && !this.tokenExpired(token)) {
      let jwtToken = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(jwtToken);
    } else {
      this.authService.logout();
      return next.handle(request);
    }
  }
}
