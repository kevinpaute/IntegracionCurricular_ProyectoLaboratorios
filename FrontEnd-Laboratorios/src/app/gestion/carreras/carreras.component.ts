import { Component, OnInit } from '@angular/core';
import { CarrerasService } from '../carreras.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  carreras: any[] = [];

  constructor(private carrerasService: CarrerasService) {}

  ngOnInit(): void {
    this.carrerasService.getAll().subscribe(data => {
      this.carreras = data;
    });
  }

  eliminarCarrera(id: number): void {
    this.carrerasService.delete(id).subscribe(() => {
      this.carreras = this.carreras.filter(c => c.id_carrera !== id);
    });
  }
}