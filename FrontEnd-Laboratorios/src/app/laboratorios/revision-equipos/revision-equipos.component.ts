import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RevisionEquiposService } from '../../services/laboratorios/revision-equipos.service';
import { RevisionEquipoModalComponent } from './revision-equipo-modal/revision-equipo-modal.component';
import { RevisionEquipoDetailModalComponent } from './revision-equipo-detail-modal/revision-equipo-detail-modal.component';

@Component({
  selector: 'app-revision-equipos',
  templateUrl: './revision-equipos.component.html',
  styleUrls: ['./revision-equipos.component.css']
})
export class RevisionEquiposComponent implements OnInit {
  revisiones: any[] = [];

  constructor(private revisionEquiposService: RevisionEquiposService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getRevisiones();
  }

  getRevisiones(): void {
    this.revisionEquiposService.getRevisiones().subscribe(data => {
      this.revisiones = data;
    });
  }

  openCreateModal(): void {
    const modalRef = this.modalService.open(RevisionEquipoModalComponent);
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getRevisiones();
      }
    }).catch((error) => {});
  }

  openEditModal(revision: any): void {
    const modalRef = this.modalService.open(RevisionEquipoModalComponent);
    modalRef.componentInstance.revision = revision;
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getRevisiones();
      }
    }).catch((error) => {});
  }

  openDetailModal(revision: any): void {
    const modalRef = this.modalService.open(RevisionEquipoDetailModalComponent);
    modalRef.componentInstance.revision = revision;
  }

  terminarProceso(revision: any): void {
    const modalRef = this.modalService.open(RevisionEquipoModalComponent);
    modalRef.componentInstance.revision = revision;
    modalRef.componentInstance.isTerminating = true;
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.getRevisiones();
      }
    }).catch((error) => {});
  }
}