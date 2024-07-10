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
  selectedCursoId: number | null = null;
  selectedMateriaId: number | null = null;

  navigateTo(view: string, id: number | null = null): void {
    this.currentView = view;
    if (view === 'cursos') {
      this.selectedCarreraId = id;
    } else if (view === 'materias') {
      this.selectedCursoId = id;
    } else if (view === 'estudiantes') {
      this.selectedMateriaId = id;
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