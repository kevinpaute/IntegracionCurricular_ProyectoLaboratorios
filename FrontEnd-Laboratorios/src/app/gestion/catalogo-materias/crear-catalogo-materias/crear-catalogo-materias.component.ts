import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogoMateriasService } from '../../catalogo-materias.service';

@Component({
  selector: 'app-crear-catalogo-materias',
  templateUrl: './crear-catalogo-materias.component.html',
  styleUrls: ['./crear-catalogo-materias.component.css']
})
export class CrearCatalogoMateriasComponent {
  nombre_materia = '';

  constructor(private catalogoMateriasService: CatalogoMateriasService, private router: Router) {}

  crearCatalogoMateria(): void {
    const nuevoCatalogoMateria = {
      nombre_materia: this.nombre_materia,
    };
    this.catalogoMateriasService.create(nuevoCatalogoMateria).subscribe(() => {
      this.router.navigate(['/gestion/catalogo-materias']);
    });
  }
}
