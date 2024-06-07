import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarrerasService } from '../../carreras.service';

@Component({
  selector: 'app-crear-carrera',
  templateUrl: './crear-carrera.component.html',
  styleUrls: ['./crear-carrera.component.css']
})
export class CrearCarreraComponent {
  nombre_carrera = '';
  estado = 'activo';

  constructor(private carrerasService: CarrerasService, private router: Router) {}

  crearCarrera(): void {
    const nuevaCarrera = { nombre_carrera: this.nombre_carrera, estado: this.estado };
    this.carrerasService.create(nuevaCarrera).subscribe(() => {
      this.router.navigate(['/gestion/carreras']);
    });
  }
}
