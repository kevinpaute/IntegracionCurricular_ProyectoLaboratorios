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
  fechaNacimientoLocal: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.usuario && this.usuario.Detalle_Usuario.fecha_nacimiento) {
      const fechaUtc = new Date(this.usuario.Detalle_Usuario.fecha_nacimiento);
      this.fechaNacimientoLocal = this.convertToLocalDateString(fechaUtc);
    }
  }

  convertToLocalDateString(date: Date): string {
    return date.toLocaleDateString('es-EC', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
