import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from '../../materias.service';
import { CarrerasService } from '../../carreras.service';
import { PeriodosService } from '../../periodos.service';
import { CatalogoMateriasService } from '../../catalogo-materias.service';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css']
})
export class EditarMateriaComponent implements OnInit {
  id: number;
  codigo_materia = '';
  estado = 'activo';
  id_catalogo: number;
  id_carrera: number;
  id_periodo: number;
  catalogos: any[] = [];
  carreras: any[] = [];
  periodos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private carrerasService: CarrerasService,
    private periodosService: PeriodosService,
    private catalogoMateriasService: CatalogoMateriasService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.materiasService.getById(this.id).subscribe(data => {
      this.codigo_materia = data.codigo_materia;
      this.estado = data.estado;
      this.id_catalogo = data.id_catalogo;
      this.id_carrera = data.id_carrera;
      this.id_periodo = data.id_periodo;
    });

    this.carrerasService.getAll().subscribe(data => {
      this.carreras = data;
    });

    this.periodosService.getAll().subscribe(data => {
      this.periodos = data;
    });

    this.catalogoMateriasService.getAll().subscribe(data => {
      this.catalogos = data;
    });
  }

  actualizarMateria(): void {
    const materiaActualizada = {
      codigo_materia: this.codigo_materia,
      estado: this.estado,
      id_catalogo: this.id_catalogo,
      id_carrera: this.id_carrera,
      id_periodo: this.id_periodo
    };
    this.materiasService.update(this.id, materiaActualizada).subscribe(() => {
      this.router.navigate(['/gestion/materias']);
    });
  }
}
