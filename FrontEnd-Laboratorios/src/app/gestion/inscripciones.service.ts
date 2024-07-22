import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getEstudiantesByMateria(idMateria: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/materia/${idMateria}/estudiantes`);
  }

  getInscripcionesPorMateria(id_materia: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inscripciones/materia/${id_materia}`);
  }
  
}
