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
  filteredLaboratorios: any[] = [];
  loading: boolean = true;
  search: string = '';
  pageSize: number = 5;

  constructor(private laboratorioService: LaboratoriosService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getLaboratorios();
  }

  getLaboratorios(): void {
    this.loading = true; // Set loading to true before fetching data
    this.laboratorioService.getLaboratorios().subscribe(data => {
      this.laboratorios = data;
      this.filteredLaboratorios = this.laboratorios;
      this.loading = false; // Set loading to false after data is fetched
    }, () => {
      this.loading = false; // Set loading to false in case of error
    });
  }

  searchLaboratorios(): void {
    if (this.search) {
      this.filteredLaboratorios = this.laboratorios.filter(laboratorio => 
        laboratorio.nombre_laboratorio.toLowerCase().includes(this.search.toLowerCase()));
    } else {
      this.filteredLaboratorios = this.laboratorios;
    }
  }
  
  openCreateModal(): void {
    const modalRef = this.modalService.open(LaboratorioModalComponent);
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getLaboratorios();
      }
    }).catch((error) => {});
  }

  openEditModal(laboratorio: any): void {
    const modalRef = this.modalService.open(LaboratorioModalComponent);
    modalRef.componentInstance.laboratorio = laboratorio;
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getLaboratorios();
      }
    }).catch((error) => {});
  }

}
