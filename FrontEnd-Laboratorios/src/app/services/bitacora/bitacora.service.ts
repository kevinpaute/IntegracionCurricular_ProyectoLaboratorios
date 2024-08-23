import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BitacoraService {
 
  private apiUrl = 'http://localhost:3000/api/bitacoras';  // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener bitácoras activas
  getBitacorasActivas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/activas`);
  }

  // Obtener bitácoras completadas
  getBitacorasCompletadas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/completadas`);
  }

  // Crear una nueva bitácora
  crearBitacora(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // Subir evidencia para una bitácora
  subirEvidencia(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('evidencia', file);
    return this.http.post(`${this.apiUrl}/${id}/evidencia`, formData);
  }

    // Editar una bitácora existente
    editarBitacora(id: number, data: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, data);
    }
}
