import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../cursos.service';
import { PeriodosService } from '../periodos.service';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  cursos: any[] = [];
  periodos: any[] = [];
  selectedPeriodo: number;
  idCarrera: number;

  constructor(
    private cursosService: CursosService,
    private periodosService: PeriodosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCarrera = +this.route.snapshot.paramMap.get('idCarrera')!;
    this.getPeriodos();
  }

  getPeriodos(): void {
    this.periodosService.getAll().subscribe(data => {
      this.periodos = data;
      if (this.periodos.length > 0) {
        this.selectedPeriodo = this.periodos[0].id_periodo;
        this.getCursosByPeriodo();
      }
    });
  }

  getCursosByPeriodo(): void {
    this.cursosService.getCursosByPeriodo(this.selectedPeriodo).subscribe(data => {
      this.cursos = data.filter(curso => curso.id_carrera === this.idCarrera);
    });
  }

  goToMaterias(idCurso: number): void {
    this.router.navigate(['/gestion//carreras', this.idCarrera, 'cursos', idCurso, 'materias']);
  }
}