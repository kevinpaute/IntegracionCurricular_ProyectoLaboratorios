import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/login/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  password: string = '';
  confirmPassword: string = '';
  token: string;
  errorMessage: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.token = this.route.snapshot.params['token'];
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.authService.resetPassword(this.token, this.password).subscribe({
      next: () => {
        Swal.fire({
          title: 'Éxito',
          text: 'Contraseña cambiada exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        console.error('Error al cambiar la contraseña', err);
        this.toastr.error('Ocurrió un error. Por favor, inténtelo de nuevo.');
      }
    });
  }
}
