import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LaboratorioModalComponent } from './laboratorio-modal/laboratorio-modal.component';
import { LaboratoriosService } from '../services/laboratorios/laboratorios.service';

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.css']
})
export class LaboratoriosComponent implements OnInit {
  laboratorios: any[] = [];
  searchTerm: string = '';
  page: number = 1;
  pageSize: number = 10;

  constructor(private laboratorioService: LaboratoriosService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getLaboratorios();
  }

  getLaboratorios(): void {
    this.laboratorioService.getLaboratorios().subscribe(data => {
      this.laboratorios = data;
    });
  }

  openCreateModal(): void {
    const modalRef = this.modalService.open(LaboratorioModalComponent);
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.getLaboratorios();
      }
    }).catch((error) => {});
  }

  openEditModal(laboratorio: any): void {
    const modalRef = this.modalService.open(LaboratorioModalComponent);
    modalRef.componentInstance.laboratorio = laboratorio;
    modalRef.result.then((result) => {
      if (result === 'success') {
        this.getLaboratorios();
      }
    }).catch((error) => {});
  }
}
