import { Component, Input, OnInit } from '@angular/core';
import { InscripcionesService } from '../inscripciones.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  @Input() idMateria: number;
  estudiantes: any[] = [];

  constructor(private estudiantesService: InscripcionesService) {}

  ngOnInit(): void {
    this.getEstudiantes();
  }

  getEstudiantes(): void {
    this.estudiantesService.getEstudiantesByMateria(this.idMateria).subscribe(data => {
      this.estudiantes = data;
    });
  }
}
