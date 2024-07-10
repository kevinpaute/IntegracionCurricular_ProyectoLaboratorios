import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarrerasService } from '../carreras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  @Output() navigate = new EventEmitter<number>();
  carreras: any[] = [];

  constructor(private carrerasService: CarrerasService) {}

  ngOnInit(): void {
    this.getCarreras();
  }

  getCarreras(): void {
    this.carrerasService.getCarreras().subscribe(data => {
      this.carreras = data;
    });
  }

  goToCursos(idCarrera: number): void {
    this.navigate.emit(idCarrera);
  }
}

  // eliminarCarrera(id: number): void {
  //   this.carrerasService.delete(id).subscribe(() => {
  //     this.carreras = this.carreras.filter(c => c.id_carrera !== id);
  //   });
  // }