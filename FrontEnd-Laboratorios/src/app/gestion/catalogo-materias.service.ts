import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoMateriasService {
  private apiUrl = 'http://localhost:3000/api/catalogo_materias'; // Ajusta la URL a tu backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(catalogo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, catalogo);
  }

  update(id: number, catalogo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, catalogo);
  }

  delete(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, { estado: 'inactivo' });
  }
}
