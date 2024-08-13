import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BitacoraService {
  private apiUrl = 'http://localhost:3000/api/bitacoras';

  constructor(private http: HttpClient) {}

  getAllBitacoras(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getBitacoraById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createBitacora(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateBitacora(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }
}
