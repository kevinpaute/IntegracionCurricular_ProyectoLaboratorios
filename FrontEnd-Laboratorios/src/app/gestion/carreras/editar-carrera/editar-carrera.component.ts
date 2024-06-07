import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrerasService } from '../../carreras.service';

@Component({
  selector: 'app-editar-carrera',
  templateUrl: './editar-carrera.component.html',
  styleUrls: ['./editar-carrera.component.css']
})
export class EditarCarreraComponent implements OnInit {
  id: number;
  nombre_carrera = '';
  estado = 'activo';

  constructor(
    private route: ActivatedRoute,
    private carrerasService: CarrerasService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.carrerasService.getById(this.id).subscribe(data => {
      this.nombre_carrera = data.nombre_carrera;
      this.estado = data.estado;
    });
  }

  actualizarCarrera(): void {
    const carreraActualizada = { nombre_carrera: this.nombre_carrera, estado: this.estado };
    this.carrerasService.update(this.id, carreraActualizada).subscribe(() => {
      this.router.navigate(['/gestion/carreras']);
    });
  }
}
