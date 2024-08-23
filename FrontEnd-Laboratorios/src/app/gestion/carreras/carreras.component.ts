import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarrerasService } from '../carreras.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})
export class CarrerasComponent implements OnInit {
  @Output() navigate = new EventEmitter<{ idCarrera: number, nombreCarrera: string }>();
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

  goToCursos(idCarrera: number, nombreCarrera: string): void {
    this.navigate.emit({ idCarrera, nombreCarrera });
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


  importAllData(): void {
    Swal.fire({
      title: 'Importando todos los datos...',
      html: 'Por favor espere mientras se importan los datos de carreras, periodos, cursos y materias.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.carrerasService.importAllData().subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Todos los datos importados exitosamente',
          showConfirmButton: true
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al importar datos',
          text: 'Ocurrió un problema al importar los datos. Por favor, intente de nuevo.',
        });
      }
    );
  }
}

