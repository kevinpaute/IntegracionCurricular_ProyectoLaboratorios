import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.css']
})
export class UsuarioModalComponent implements OnInit{
  @Input() usuario: any;
  @Input() rol: string;
  usuarioForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private usuarioService: UsuariosService) {
    this.usuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      celular: [''],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      estado: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.usuario) {
      this.usuarioForm.patchValue(this.usuario.Detalle_Usuario);
    }
  }

  save(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    const usuarioData = {
      Detalle_Usuario: this.usuarioForm.value,
      id_rol: this.rol
    };

    if (this.usuario) {
      this.usuarioService.updateUsuario(this.usuario.id_usuario, usuarioData).subscribe(() => {
        this.activeModal.close('saved');
      });
    } else {
      this.usuarioService.createUsuario(usuarioData).subscribe(() => {
        this.activeModal.close('saved');
      });
    }
  }
}
