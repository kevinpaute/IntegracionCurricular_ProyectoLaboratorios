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
        this.router.navigate(['/gestion/carreras']);
      },
      error: err => {
        this.errorMessage = 'Credenciales incorrectas. Por favor, inténtelo de nuevo.';
        console.error('Error al iniciar sesión', err);
      }
    });
  }
}

