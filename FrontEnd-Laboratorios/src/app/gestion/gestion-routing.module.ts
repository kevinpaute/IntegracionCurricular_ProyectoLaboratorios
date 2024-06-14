import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { CrearUsuariosComponent } from './usuarios/crear-usuarios/crear-usuarios.component';
import { EditarUsuarioComponent } from './usuarios/editar-usuario/editar-usuario.component';

const routes: Routes = [
  { path: 'carreras', component: CarrerasComponent },
  { path: 'carreras/crear', component: CrearCarreraComponent },
  { path: 'carreras/editar/:id', component: EditarCarreraComponent },
  { path: 'materias', component: MateriasComponent },
  { path: 'materias/crear', component: CrearMateriaComponent },
  { path: 'materias/editar/:id', component: EditarMateriaComponent },
  { path: 'periodos', component: PeriodosComponent },
  { path: 'periodos/crear', component: CrearPeriodoComponent },
  { path: 'periodos/editar/:id', component: EditarPeriodoComponent },
  { path: 'catalogo-materias', component: CatalogoMateriasComponent },
  { path: 'catalogo-materias/crear', component: CrearCatalogoMateriasComponent },
  { path: 'catalogo-materias/editar/:id', component: EditarCatalogoMateriasComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/crear', component: CrearUsuariosComponent },
  { path: 'usuarios/editar/:id', component: EditarUsuarioComponent },
  { path: '', redirectTo: 'carreras', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
