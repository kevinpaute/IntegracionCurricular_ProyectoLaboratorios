import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrerasComponent } from './carreras/carreras.component';
import { CursosComponent } from './cursos/cursos.component';
import { MateriasComponent } from './materias/materias.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProgramasComponent } from './programas/programas.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ProgramasComponent, children: [
    { path: 'carreras', component: CarrerasComponent, canActivate: [AuthGuard], data: { role: 'administrador' } },
    { path: 'carreras/:idCarrera/cursos', component: CursosComponent, canActivate: [AuthGuard], data: { role: 'administrador' } },
    { path: 'carreras/:idCarrera/cursos/:idCurso/materias', component: MateriasComponent, canActivate: [AuthGuard], data: { role: 'administrador' } },
    { path: 'carreras/:idCarrera/cursos/:idCurso/materias/:idMateria/estudiantes', component: InscripcionesComponent, canActivate: [AuthGuard], data: { role: 'administrador' } },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
