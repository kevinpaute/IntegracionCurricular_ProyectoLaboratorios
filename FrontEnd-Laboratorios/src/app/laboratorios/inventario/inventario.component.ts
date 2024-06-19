import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InventarioService } from '../../services/laboratorios/inventario.service';
import { InventarioModalComponent } from './inventario-modal/inventario-modal.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  equipos: any[] = [];

  constructor(private equiposService: InventarioService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getEquipos();
  }

  getEquipos(): void {
    this.equiposService.getEquipos().subscribe(data => {
      this.equipos = data;
    });
  }

  openCreateModal(): void {
    const modalRef = this.modalService.open(InventarioModalComponent);
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getEquipos();
      }
    }).catch((error) => {});
  }

  openEditModal(equipo: any): void {
    const modalRef = this.modalService.open(InventarioModalComponent);
    modalRef.componentInstance.equipo = equipo;
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getEquipos();
      }
    }).catch((error) => {});
  }
}