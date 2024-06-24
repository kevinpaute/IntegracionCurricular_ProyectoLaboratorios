import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RevisionEquiposService } from '../../../services/laboratorios/revision-equipos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioService } from 'src/app/services/laboratorios/inventario.service';

@Component({
  selector: 'app-revision-equipo-modal',
  templateUrl: './revision-equipo-modal.component.html',
  styleUrls: ['./revision-equipo-modal.component.css']
})
export class RevisionEquipoModalComponent implements OnInit {
  @Input() revision: any;
  @Input() isTerminating: boolean = false;
  revisionForm: FormGroup;
  equipos: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private revisionService: RevisionEquiposService,
    private equipoService: InventarioService
  ) {
    this.revisionForm = this.fb.group({
      id_equipo: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      tipo_revision: ['', Validators.required],
      estado_revision: ['', Validators.required],
      novedad: ['', Validators.required],
      observaciones: [''],
      solucion: ['', Validators.required],
      repuestos_utilizados: [''],
      costo_revision: [0, Validators.required],
      fecha_fin: ['', Validators.required],
      foto_antes: [''],
      foto_despues: ['']
    });
  }

  ngOnInit(): void {
    this.equipoService.getEquipos().subscribe(data => {
      this.equipos = data;
    });

    if (this.revision) {
      // Formatear fechas para que sean compatibles con los controles de fecha HTML5
      const formattedFechaInicio = new Date(this.revision.fecha_inicio).toISOString().substring(0, 16);
      const formattedFechaFin = this.revision.fecha_fin ? new Date(this.revision.fecha_fin).toISOString().substring(0, 16) : '';

      this.revisionForm.patchValue({
        ...this.revision,
        fecha_inicio: formattedFechaInicio,
        fecha_fin: formattedFechaFin
      });

      if (this.isTerminating) {
        this.revisionForm.patchValue({ estado_revision: 'Inactivo', fecha_fin: new Date().toISOString().substring(0, 16) });
      }
    }
  }

  save(): void {
    if (this.revisionForm.invalid) {
      return;
    }

    if (this.revision) {
      this.revisionService.updateRevision(this.revision.id_revision, this.revisionForm.value).subscribe(() => {
        this.activeModal.close('saved');
      });
    } else {
      this.revisionService.createRevision(this.revisionForm.value).subscribe(() => {
        this.activeModal.close('saved');
      });
    }
  }
}