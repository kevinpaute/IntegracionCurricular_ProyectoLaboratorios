import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MateriasService } from '../../materias.service';
import { CatalogoMateriasService } from '../../catalogo-materias.service';
import { CarrerasService } from '../../carreras.service';
import { PeriodosService } from '../../periodos.service';


@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.css']
})
export class CrearMateriaComponent implements OnInit {
  codigo_materia: string = '';
  estado: string = 'activo';
  id_catalogo: number | null = null;
  id_carrera: number | null = null;
  id_periodo: number | null = null;
  catalogos: any[] = [];
  carreras: any[] = [];
  periodos: any[] = [];

  constructor(
    private materiasService: MateriasService,
    private catalogoMateriasService: CatalogoMateriasService,
    private carrerasService: CarrerasService,
    private periodosService: PeriodosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.catalogoMateriasService.getAll().subscribe(data => {
      this.catalogos = data;
    });
    this.carrerasService.getAll().subscribe(data => {
      this.carreras = data;
    });
    this.periodosService.getAll().subscribe(data => {
      this.periodos = data;
    });
  }

  crearMateria(): void {
    const nuevaMateria = {
      codigo_materia: this.codigo_materia,
      estado: this.estado,
      id_catalogo: this.id_catalogo !== null ? Number(this.id_catalogo) : null,
      id_carrera: this.id_carrera !== null ? Number(this.id_carrera) : null,
      id_periodo: this.id_periodo !== null ? Number(this.id_periodo) : null
    };
    this.materiasService.create(nuevaMateria).subscribe(
      () => {
        this.router.navigate(['/gestion/materias']);
      },
      error => {
        console.error('Error al crear la materia:', error);
      }
    );
  }
}