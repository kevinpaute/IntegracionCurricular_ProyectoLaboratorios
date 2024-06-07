import { Component, OnInit } from '@angular/core';
import { MateriasService } from '../materias.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {
  materias: any[] = [];

  constructor(private materiasService: MateriasService) {}

  ngOnInit(): void {
    this.materiasService.getAll().subscribe(data => {
      this.materias = data;
    });
  }

  eliminarMateria(id: number): void {
    this.materiasService.delete(id).subscribe(() => {
      this.materias = this.materias.filter(m => m.id_materia !== id);
    });
  }
}
