import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enquiry, EnquiryList } from '../interface/Enquiry';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnquiryService {
  constructor(private http: HttpClient) {}

  addEnquiry(enquiry: Enquiry): Observable<any> {
    return this.http.post<any>(environment.API_BASE_URL + 'enquiry', enquiry);
  }

  getEnquiries(enquiry: EnquiryList): Observable<any> {
    return this.http.post<any>(
      environment.API_BASE_URL + 'enquiry/list',
      enquiry
    );
  }
}
