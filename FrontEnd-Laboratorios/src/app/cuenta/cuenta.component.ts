import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/login/auth.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  userName: string | null = null;
  userRole: string | null = null;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private authService: AuthService) {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getRole();
  }

  ngOnInit(): void {}

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'La nueva contraseña y la confirmación no coinciden.';
      return;
    }
    // Aquí se llamaría al servicio para cambiar la contraseña
    this.message = 'Contraseña cambiada exitosamente.';
  }
}
