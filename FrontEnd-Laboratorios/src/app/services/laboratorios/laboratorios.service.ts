import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratoriosService {
  private baseUrl = 'http://localhost:3000/api/laboratorios';

  constructor(private http: HttpClient) { }

  getLaboratorios(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getLaboratorio(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createLaboratorio(laboratorio: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, laboratorio);
  }

  updateLaboratorio(id: number, laboratorio: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, laboratorio);
  }

  deleteLaboratorio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
