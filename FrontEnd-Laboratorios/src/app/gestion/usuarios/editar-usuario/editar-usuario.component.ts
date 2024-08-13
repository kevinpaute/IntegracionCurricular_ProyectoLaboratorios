import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  @Input() usuario: any;
  usuarioForm: FormGroup;
  roles: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private usuarioService: UsuariosService
  ) {
    this.usuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: [''],
      genero: ['', Validators.required],
      estado: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRoles();
    if (this.usuario) {
      const fechaNacimiento = this.usuario.Detalle_Usuario.fecha_nacimiento ? new Date(this.usuario.Detalle_Usuario.fecha_nacimiento).toISOString().split('T')[0] : '';
      this.usuarioForm.patchValue({

        ...this.usuario.Detalle_Usuario,
        fecha_nacimiento: fechaNacimiento,
        rol: this.usuario.Roles.id_rol,
        estado: this.usuario.Detalle_Usuario.estado
      });
    }
  }

  loadRoles(): void {
    // Dado que ya tienes la lista de usuarios, los roles se pueden cargar desde ahí o desde un servicio
    this.roles = [
      { id_rol: 1, nombre_rol: 'administrador' },
      { id_rol: 2, nombre_rol: 'laboratorista' },
      { id_rol: 3, nombre_rol: 'docente' },
      { id_rol: 4, nombre_rol: 'estudiante' }
    ];
  }

  save(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    const usuarioData = {
      Detalle_Usuario: this.usuarioForm.value,
      id_rol: parseInt(this.usuarioForm.value.rol) // Convertir el rol a número
    };

    this.usuarioService.updateUsuario(this.usuario.id_usuario, usuarioData).subscribe(() => {
      this.activeModal.close('saved');
    });
  }
}