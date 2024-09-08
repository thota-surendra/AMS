import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export interface Airline {
  id: number;
  providerName: string;
  providerCode: string;
  providerType: string;
}

@Injectable({
  providedIn: 'root',
})
export class AirlineService {
  private airlinesData: Airline[] = [
    {
      id: 1,
      providerName: 'Jet Airways',
      providerCode: '9W-',
      providerType: 'Domestic',
    },
    {
      id: 2,
      providerName: 'SpiceJet',
      providerCode: 'SG-',
      providerType: 'Domestic',
    },
    {
      id: 3,
      providerName: 'Indigo',
      providerCode: '6E-',
      providerType: 'Domestic',
    },
    {
      id: 4,
      providerName: 'Air India',
      providerCode: 'AI-',
      providerType: 'Domestic',
    },
    {
      id: 5,
      providerName: 'Go Air',
      providerCode: 'G8-',
      providerType: 'Domestic',
    },
  ];
  private apiUrl = 'http://localhost:3000/airlines'; // The db.json endpoint

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getAirlines(): Observable<Airline[]> {
    return this.http.get<Airline[]>(this.apiUrl);
  }

  addAirline(airline: Airline): Observable<Airline> {
    return this.http.post<Airline>(this.apiUrl, airline);
  }

  updateAirline(id: number, updatedAirline: Airline): Observable<Airline> {
    return this.http.put<Airline>(`${this.apiUrl}/${id}`, updatedAirline);
  }

  deleteAirline(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAirlineByCode(providerCode: string): Observable<Airline[]> {
    return this.http.get<Airline[]>(`${this.apiUrl}?providerCode=${providerCode}`);
  }

  getAirlineByCodeType(providerCode: string, providerType: string): Observable<Airline[]> {
    return this.http.get<Airline[]>(`${this.apiUrl}?providerCode=${providerCode}&providerType=${providerType}`);
  }


  getAirlineDataByCode(providerCode: string): Airline | undefined {
    return this.airlinesData.find((a) => a.providerCode === providerCode);
  }

  showSuccess(message: string, title = 'success') {
    this.toastr.success(message, title);
  }
  showError(message: string, title = 'error') {
    this.toastr.error(message, title);
  }
}
