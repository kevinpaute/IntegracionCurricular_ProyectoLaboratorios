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
      this.revisionForm.patchValue(this.revision);
    }
  }

  save(): void {
    if (this.revisionForm.invalid) {
      return;
    }

    if (this.revision) {
      this.revisionService.updateRevision(this.revision.id_revision, this.revisionForm.value).subscribe(() => {
        this.activeModal.close('success');
      });
    } else {
      this.revisionService.createRevision(this.revisionForm.value).subscribe(() => {
        this.activeModal.close('success');
      });
    }
  }
}