import { Component, OnInit } from '@angular/core';
import { InscripcionesService } from '../inscripciones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {
  estudiantes: any[] = [];
  idMateria: number;

  constructor(
    private estudiantesService: InscripcionesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idMateria = +(this.route.snapshot.paramMap.get('idMateria') ?? 0);
    this.getEstudiantes();
  }

  getEstudiantes(): void {
    this.estudiantesService.getEstudiantesByMateria(this.idMateria).subscribe(data => {
      this.estudiantes = data;
    });
  }
}