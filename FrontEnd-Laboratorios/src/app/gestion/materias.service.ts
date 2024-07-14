import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getMateriasByCurso(idCurso: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cursos/${idCurso}/materias`);
  }


  getMateriaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/materias/${id}`);
  }

  /////
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/materias/`);
  }

  getMateriasByDocente(idDocente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/docente/${idDocente}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/materias/${id}`);
  }

  create(materia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/materias/`, materia);
  }

  update(id: number, materia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/materias/${id}`, materia);
  }

  delete(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/materias/${id}`, { estado: 'inactivo' });
  }
}
