import { Component, OnInit } from '@angular/core';
import { CatalogoMateriasService } from '../catalogo-materias.service';

@Component({
  selector: 'app-catalogo-materias',
  templateUrl: './catalogo-materias.component.html',
  styleUrls: ['./catalogo-materias.component.css']
})
export class CatalogoMateriasComponent implements OnInit {
  catalogos: any[] = [];

  constructor(private catalogoMateriasService: CatalogoMateriasService) {}

  ngOnInit(): void {
    this.catalogoMateriasService.getAll().subscribe(data => {
      this.catalogos = data;
    });
  }

  eliminarCatalogo(id: number): void {
    this.catalogoMateriasService.delete(id).subscribe(() => {
      this.catalogos = this.catalogos.filter(c => c.id_catalogo !== id);
    });
  }
}
