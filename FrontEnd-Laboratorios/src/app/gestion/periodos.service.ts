import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodosService {
  private apiUrl = 'http://localhost:3000/api/periodos_academicos'; // Ajusta la URL a tu backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(periodo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, periodo);
  }

  update(id: number, periodo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, periodo);
  }

  delete(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { estado: 'inactivo' });
  }
}
