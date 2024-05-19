import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChangePassword, UserProfile } from '../interface/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDetails(id: number): Observable<any> {
    return this.http.get<any>(environment.API_BASE_URL + 'user/' + id);
  }

  updateProfile(id: number, profileRequest: UserProfile): Observable<any> {
    return this.http.put<any>(
      environment.API_BASE_URL + 'user' + '?id=' + id,
      profileRequest
    );
  }

  changePassword(id: number, passwordRequest: ChangePassword): Observable<any> {
    return this.http.put<any>(
      environment.API_BASE_URL + 'user/change-password' + '?id=' + id,
      passwordRequest
    );
  }
}
