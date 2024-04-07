import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enquiry } from '../interface/Enquiry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnquiryService {
  constructor(private http: HttpClient) {}

  addEnquiry(enquiry: Enquiry): Observable<any> {
    return this.http.post<any>('https://localhost:7220/api/enquiry', enquiry);
  }
}
