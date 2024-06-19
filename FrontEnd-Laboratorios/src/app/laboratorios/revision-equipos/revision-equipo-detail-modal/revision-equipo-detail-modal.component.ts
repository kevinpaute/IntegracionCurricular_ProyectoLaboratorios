import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-revision-equipo-detail-modal',
  templateUrl: './revision-equipo-detail-modal.component.html',
  styleUrls: ['./revision-equipo-detail-modal.component.css']
})
export class RevisionEquipoDetailModalComponent implements OnInit {
  @Input() revision: any;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}