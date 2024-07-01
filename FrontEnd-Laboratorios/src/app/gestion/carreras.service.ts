import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private baseUrl = 'http://localhost:3000/api/carreras';

  constructor(private http: HttpClient) {}

  getCarreras(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getCursosByCarrera(idCarrera: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${idCarrera}/cursos`);
  }
  
  /////

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(carrera: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, carrera);
  }

  update(id: number, carrera: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, carrera);
  }

  delete(id: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, { estado: 'inactivo' });
  }
}
