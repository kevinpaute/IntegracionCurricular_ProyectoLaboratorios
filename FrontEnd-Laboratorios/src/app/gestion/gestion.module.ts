import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestionRoutingModule } from './gestion-routing.module';
import { CarrerasComponent } from './carreras/carreras.component';
import { CrearCarreraComponent } from './carreras/crear-carrera/crear-carrera.component';
import { EditarCarreraComponent } from './carreras/editar-carrera/editar-carrera.component';
import { MateriasComponent } from './materias/materias.component';
import { CrearMateriaComponent } from './materias/crear-materia/crear-materia.component';
import { EditarMateriaComponent } from './materias/editar-materia/editar-materia.component';
import { PeriodosComponent } from './periodos/periodos.component';
import { CrearPeriodoComponent } from './periodos/crear-periodo/crear-periodo.component';
import { EditarPeriodoComponent } from './periodos/editar-periodo/editar-periodo.component';
import { CatalogoMateriasComponent } from './catalogo-materias/catalogo-materias.component';
import { CrearCatalogoMateriasComponent } from './catalogo-materias/crear-catalogo-materias/crear-catalogo-materias.component';
import { EditarCatalogoMateriasComponent } from './catalogo-materias/editar-catalogo-materias/editar-catalogo-materias.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioModalComponent } from './usuarios/usuario-modal/usuario-modal.component';
import { CrearUsuariosComponent } from './usuarios/crear-usuarios/crear-usuarios.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { CursosComponent } from './cursos/cursos.component';
import { DetalleMateriaComponent } from './materias/detalle-materia/detalle-materia.component';
import { ProgramasComponent } from './programas/programas.component';
import { GestionMateriasComponent } from './gestion-materias/gestion-materias.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    CarrerasComponent,
    CrearCarreraComponent,
    EditarCarreraComponent,
    MateriasComponent,
    CrearMateriaComponent,
    EditarMateriaComponent,
    PeriodosComponent,
    CrearPeriodoComponent,
    EditarPeriodoComponent,
    CatalogoMateriasComponent,
    CrearCatalogoMateriasComponent,
    EditarCatalogoMateriasComponent,
    UsuariosComponent,
    UsuarioModalComponent,
    CrearUsuariosComponent,
    EditarUsuarioComponent,
    InscripcionesComponent,
    CursosComponent,
    DetalleMateriaComponent,
    ProgramasComponent,
    GestionMateriasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GestionRoutingModule,
    NgbModule,

    TableModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    CardModule,
  ]
})
export class GestionModule { }
