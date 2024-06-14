import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent {
  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      primer_nombre: ['', Validators.required],
      segundo_nombre: [''],
      primer_apellido: ['', Validators.required],
      segundo_apellido: [''],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      fecha_nacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: [''],
      genero: ['', Validators.required],
      estado: ['', Validators.required],
      id_rol: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.usuariosService.create(this.usuarioForm.value).subscribe(() => {
        this.router.navigate(['/gestion/usuarios']);
      });
    }
  }
}
