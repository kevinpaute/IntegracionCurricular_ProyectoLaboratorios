import { Component, OnInit } from '@angular/core';
import { MateriasService } from '../materias.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  materias: any[] = [];
  idCarrera: number;
  idCurso: number;

  constructor(
    private materiasService: MateriasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCarrera = +this.route.snapshot.paramMap.get('idCarrera')!;
    this.idCurso = +this.route.snapshot.paramMap.get('idCurso')!;
    this.getMaterias();
  }

  getMaterias(): void {
    this.materiasService.getMateriasByCurso(this.idCurso).subscribe(data => {
      this.materias = data;
    });
  }

  goToEstudiantes(idMateria: number): void {
    this.router.navigate(['/gestion/carreras', this.idCarrera, 'cursos', this.idCurso, 'materias', idMateria, 'estudiantes']);
  }

  // materias: any[] = [];

  // constructor(private materiasService: MateriasService) {}

  // ngOnInit(): void {
  //   this.materiasService.getAll().subscribe(data => {
  //     this.materias = data;
  //   });
  // }

  // eliminarMateria(id: number): void {
  //   this.materiasService.delete(id).subscribe(() => {
  //     this.materias = this.materias.filter(m => m.id_materia !== id);
  //   });
  // }
}
