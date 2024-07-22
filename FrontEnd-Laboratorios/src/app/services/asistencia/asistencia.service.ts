import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAsistenciasByReserva(id_reserva: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/asistencias/reserva/${id_reserva}`);
  }

  updateAsistencia(asistenciaId: number, asistencia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/asistencias/${asistenciaId}`, asistencia);
  }

  createOrUpdateAsistencia(asistencia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/asistencias`, asistencia);
  }

  markAttendanceViaQr(data: { id_reserva: number; id_estudiante: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/asistencias/qr`, data);
  }
}
