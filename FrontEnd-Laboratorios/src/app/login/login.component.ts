import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/login/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cedula: string = '';
  contrasena: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.cedula, this.contrasena).subscribe({
      next: () => {
        const role = this.authService.getRole();
        if (role === 'administrador') {
          this.router.navigate(['/gestion/carreras']);
        } else if (role === 'laboratorista') {
          this.router.navigate(['/laboratorios/modulo']);
        } else if (role === 'docente') {
          this.router.navigate(['/gestion/mis-materias']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: err => {
        this.errorMessage = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
        console.error('Error al iniciar sesión', err);
      }
    });
  }
}

