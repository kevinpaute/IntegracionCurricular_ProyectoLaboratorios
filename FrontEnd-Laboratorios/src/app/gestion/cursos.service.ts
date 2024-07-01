import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCursosByCarrera(idCarrera: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}/carreras/${idCarrera}/cursos`);
  }

  getCursosByPeriodo(idPeriodo: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.baseUrl}/periodos/${idPeriodo}/cursos`);
  }

}
