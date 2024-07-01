import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriasService } from '../../materias.service';

@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.component.html',
  styleUrls: ['./detalle-materia.component.css']
})
export class DetalleMateriaComponent implements OnInit{
  materia: any;

  constructor(
    private materiaService: MateriasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +(this.route.snapshot.paramMap.get('id') ?? 0);
    this.getMateria(id);
  }

  getMateria(id: number): void {
    this.materiaService.getMateriaById(id).subscribe(data => {
      this.materia = data;
    });
  }

}
