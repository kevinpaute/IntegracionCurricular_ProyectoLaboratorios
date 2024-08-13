import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarrerasService } from '../carreras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  @Output() navigate = new EventEmitter<number>();
  carreras: any[] = [];

  constructor(private carrerasService: CarrerasService) {}

  ngOnInit(): void {
    this.getCarreras();
  }

  getCarreras(): void {
    this.carrerasService.getCarreras().subscribe(data => {
      // Add icon for each carrera based on its id or name
      this.carreras = data.map((carrera: { nombre_carrera: string; }) => {
        return {
          ...carrera,
          icono: this.getIconoCarrera(carrera.nombre_carrera)
        };
      });
    });
  }

  goToCursos(idCarrera: number): void {
    this.navigate.emit(idCarrera);
  }

  getIconoCarrera(nombreCarrera: string): string {
    switch(nombreCarrera) {
      case 'Ingeniería de Sistemas':
        return 'pi pi-cog';
      case 'Ingeniería Civil':
        return 'pi pi-building';
      case 'Ingeniería Electrónica':
        return 'pi pi-mobile';
      case 'Medicina':
        return 'pi pi-heart';
      case 'Derecho':
        return 'pi pi-book';
      case 'Administración de Empresas':
        return 'pi pi-briefcase';
      case 'Contabilidad':
        return 'pi pi-calculator';
      case 'Arquitectura':
        return 'pi pi-pencil';
      case 'Biología':
        return 'pi pi-apple';
      case 'Física':
        return 'pi pi-globe';
      default:
        return 'pi pi-briefcase';
    }
  }
}


  // eliminarCarrera(id: number): void {
  //   this.carrerasService.delete(id).subscribe(() => {
  //     this.carreras = this.carreras.filter(c => c.id_carrera !== id);
  //   });
  // }