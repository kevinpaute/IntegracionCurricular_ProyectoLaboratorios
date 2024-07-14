// reserva.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000/api/reservas';

  constructor(private http: HttpClient) {}

  getReservas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getReservasByLaboratorio(laboratorioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/laboratorio/${laboratorioId}`);
  }

  // getLaboratorios(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/laboratorios`);
  // }

  // getMaterias(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/materias`);
  // }

  createReserva(reserva: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reserva);
  }

  updateReserva(id: number, reserva: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, reserva);
  }

  changeReservaStatus(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/status`, { estado: 'inactivo' });
  }
}
