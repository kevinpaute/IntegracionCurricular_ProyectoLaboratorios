import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CursosService } from '../cursos.service';
import { PeriodosService } from '../periodos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  @Input() idCarrera: number;
  @Output() navigate = new EventEmitter<number>();
  cursos: any[] = [];
  periodos: any[] = [];
  selectedPeriodo: number;

  constructor(
    private cursosService: CursosService,
    private periodosService: PeriodosService
  ) {}

  ngOnInit(): void {
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
    this.navigate.emit(idCurso);
  }
}
