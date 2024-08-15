import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.css']
})
export class ProgramasComponent {
  currentView: string = 'carreras';
  selectedCarreraId: number | null = null;
  selectedCarreraName: string = '';
  selectedCursoId: number | null = null;
  selectedMateriaId: number | null = null;

  navigateTo(view: string, event: { idCarrera: number, nombreCarrera: string } | number): void {
    this.currentView = view;
    if (view === 'cursos' && typeof event === 'object') {
      this.selectedCarreraId = event.idCarrera;
      this.selectedCarreraName = event.nombreCarrera;
    } else if (view === 'materias' && typeof event === 'number') {
      this.selectedCursoId = event;
    } else if (view === 'estudiantes' && typeof event === 'number') {
      this.selectedMateriaId = event;
    }
  }

  getTitle(): string {
    if (this.currentView === 'cursos') {
      return `Cursos`;
    } else if (this.currentView === 'materias') {
      return `Materias del Curso`;
    } else if (this.currentView === 'estudiantes') {
      return `Estudiantes Inscritos`;
    } else {
      return '';
    }
  }

  goBack(): void {
    if (this.currentView === 'cursos') {
      this.currentView = 'carreras';
      this.selectedCarreraId = null;
    } else if (this.currentView === 'materias') {
      this.currentView = 'cursos';
      this.selectedCursoId = null;
    } else if (this.currentView === 'estudiantes') {
      this.currentView = 'materias';
      this.selectedMateriaId = null;
    }
  }
}