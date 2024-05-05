import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ChartRequest, PieChartData } from '../interface/Chart';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getEnquiries(data: ChartRequest): Observable<any> {
    return this.http.post<any>(
      environment.API_BASE_URL + 'dashboard/count-enquiries',
      data
    );
  }

  getPieChartData(data: ChartRequest): Observable<any> {
    return this.http.post<any>(
      environment.API_BASE_URL + 'dashboard/piechart',
      data
    );
  }
}
