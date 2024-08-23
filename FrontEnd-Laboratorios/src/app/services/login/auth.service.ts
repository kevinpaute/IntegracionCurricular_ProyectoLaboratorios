import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:3000/api/auth';
  private token: string;
  private userId: number | null;

  constructor(private http: HttpClient, private router: Router, private userStateService: UserService) { }
  login(cedula: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { cedula, contrasena })
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.token = response.token;
            this.userStateService.setUserId(response.id);
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('nombres', response.nombres);
            localStorage.setItem('apellidos', response.apellidos);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('nombres');
    localStorage.removeItem('apellidos');
    this.userStateService.clearUserId();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null {
    return localStorage.getItem('nombres') + ' ' + localStorage.getItem('apellidos');
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.authUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.authUrl}/reset-password`, { token, password });
  }


}
