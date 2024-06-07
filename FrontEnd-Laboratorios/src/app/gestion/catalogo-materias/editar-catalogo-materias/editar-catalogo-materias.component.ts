import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoMateriasService } from '../../catalogo-materias.service';

@Component({
  selector: 'app-editar-catalogo-materias',
  templateUrl: './editar-catalogo-materias.component.html',
  styleUrls: ['./editar-catalogo-materias.component.css']
})
export class EditarCatalogoMateriasComponent implements OnInit {
  id: number;
  nombre_materia = '';

  constructor(
    private route: ActivatedRoute,
    private catalogoMateriasService: CatalogoMateriasService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.catalogoMateriasService.getById(this.id).subscribe(data => {
      this.nombre_materia = data.nombre_materia;
    });
  }

  actualizarCatalogoMateria(): void {
    const catalogoMateriaActualizado = {
      nombre_materia: this.nombre_materia,
    };
    this.catalogoMateriasService.update(this.id, catalogoMateriaActualizado).subscribe(() => {
      this.router.navigate(['/gestion/catalogo-materias']);
    });
  }
}
