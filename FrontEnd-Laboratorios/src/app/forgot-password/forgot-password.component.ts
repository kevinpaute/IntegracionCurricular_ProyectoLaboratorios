import { Component } from '@angular/core';
import { AuthService } from '../services/login/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  onSubmit(): void {
    this.authService.forgotPassword(this.email).subscribe({
      // next: () => {
      //   this.toastr.success('Recibirás un enlace a tu correo para restablecer tu contraseña.');
      // },
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Recibirás un enlace a tu correo para restablecer tu contraseña.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        console.error('Error al enviar el correo de recuperación', err);
        if (err.error.message === 'Correo no encontrado') {
          this.toastr.error('Correo no encontrado. Por favor, contacte con el administrador.');
        } else {
          this.toastr.error('Ocurrió un error. Por favor, inténtelo de nuevo.');
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['/login']); // Cambia la ruta según tu aplicación
  }
}
