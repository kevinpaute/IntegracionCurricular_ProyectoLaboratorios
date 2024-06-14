import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LaboratoriosService } from '../../services/laboratorios/laboratorios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-laboratorio-modal',
  templateUrl: './laboratorio-modal.component.html',
  styleUrls: ['./laboratorio-modal.component.css']
})
export class LaboratorioModalComponent implements OnInit {
  @Input() laboratorio: any;
  laboratorioForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private laboratoriosService: LaboratoriosService) {
    this.laboratorioForm = this.fb.group({
      nombre_laboratorio: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    if (this.laboratorio) {
      this.laboratorioForm.patchValue(this.laboratorio);
    }
  }

  save(): void {
    if (this.laboratorioForm.invalid) {
      return;
    }

    if (this.laboratorio) {
      this.laboratoriosService.updateLaboratorio(this.laboratorio.id_laboratorio, this.laboratorioForm.value).subscribe(() => {
        this.activeModal.close('saved');
      });
    } else {
      this.laboratoriosService.createLaboratorio(this.laboratorioForm.value).subscribe(() => {
        this.activeModal.close('saved');
      });
    }
  }
}
