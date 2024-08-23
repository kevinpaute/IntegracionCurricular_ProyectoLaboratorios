import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LaboratoriosService } from '../../services/laboratorios/laboratorios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-laboratorio-modal',
  templateUrl: './laboratorio-modal.component.html',
  styleUrls: ['./laboratorio-modal.component.css']
})
export class LaboratorioModalComponent implements OnInit {
  @Input() laboratorio: any;
  laboratorioForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private laboratoriosService: LaboratoriosService,
    private toastr: ToastrService
  ) {
    this.laboratorioForm = this.fb.group({
      nombre_laboratorio: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(1)]],
      estado: ['ACTIVO']  // Valor por defecto
    });
  }

  ngOnInit(): void {
    if (this.laboratorio) {
      // Si estamos editando, incluimos el estado en el formulario
      this.laboratorioForm.patchValue(this.laboratorio);
    } else {
      // Si estamos creando, removemos el campo estado
      this.laboratorioForm.removeControl('estado');
    }
  }

  save(): void {
    if (this.laboratorioForm.invalid) {
      return;
    }

    if (this.laboratorio) {
      this.laboratoriosService.updateLaboratorio(this.laboratorio.id_laboratorio, this.laboratorioForm.value).subscribe(
        () => {
          this.toastr.success('Laboratorio actualizado con éxito'); // Show success toastr
          this.activeModal.close('saved');
        },
        (error) => {
          this.toastr.error('Error al actualizar el laboratorio'); // Show error toastr
        }
      );
    } else {
      this.laboratoriosService.createLaboratorio(this.laboratorioForm.value).subscribe(
        () => {
          this.toastr.success('Laboratorio creado con éxito'); // Show success toastr
          this.activeModal.close('saved');
        },
        (error) => {
          this.toastr.error('Error al crear el laboratorio'); // Show error toastr
        }
      );
    }
  }
}
