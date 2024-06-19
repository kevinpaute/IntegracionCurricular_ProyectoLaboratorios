import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from '../../../services/laboratorios/inventario.service';

@Component({
  selector: 'app-inventario-modal',
  templateUrl: './inventario-modal.component.html',
  styleUrls: ['./inventario-modal.component.css']
})
export class InventarioModalComponent implements OnInit {
  @Input() equipo: any;
  equipoForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private equiposService: InventarioService) {
    this.equipoForm = this.fb.group({
      nombre_equipo: ['', Validators.required],
      descripcion: [''],
      fecha_ingreso: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: [''],
      serie: [''],
      proveedor: [''],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.equipo) {
      this.equipoForm.patchValue(this.equipo);
    }
  }

  save(): void {
    if (this.equipoForm.invalid) {
      return;
    }

    if (this.equipo) {
      this.equiposService.updateEquipo(this.equipo.id_equipo, this.equipoForm.value).subscribe(() => {
        this.activeModal.close('saved');
      });
    } else {
      this.equiposService.createEquipo(this.equipoForm.value).subscribe(() => {
        this.activeModal.close('saved');
      });
    }
  }

} 