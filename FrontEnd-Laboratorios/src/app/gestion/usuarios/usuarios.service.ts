import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  importUsuarios(): Observable<any> {
    return this.http.post(`${this.apiUrl}/importar`, {});
  }
  
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  updateUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario);
  }

  assignRole(docenteId: number, rolId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/assign-role`, { docenteId, rolId });
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/roles`); // Suponiendo que tengas un endpoint que devuelva los roles
  }

  getDocentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/docentes`);
  }
}
