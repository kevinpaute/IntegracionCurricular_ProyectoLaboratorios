import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../carreras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  carreras: any[] = [];

  constructor(private carrerasService: CarrerasService, private router: Router) {}

  ngOnInit(): void {
    this.getCarreras();
  }

  getCarreras(): void {
    this.carrerasService.getCarreras().subscribe(data => {
      this.carreras = data;
    });
  }

  goToCursos(idCarrera: number): void {
    this.router.navigate(['/gestion/carreras', idCarrera, 'cursos']);
  
  }
  // eliminarCarrera(id: number): void {
  //   this.carrerasService.delete(id).subscribe(() => {
  //     this.carreras = this.carreras.filter(c => c.id_carrera !== id);
  //   });
  // }
}