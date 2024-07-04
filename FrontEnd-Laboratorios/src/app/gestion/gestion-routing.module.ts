import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrerasComponent } from './carreras/carreras.component';
import { CursosComponent } from './cursos/cursos.component';
import { MateriasComponent } from './materias/materias.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'carreras', component: CarrerasComponent,  },
  { path: 'carreras/:idCarrera/cursos', component: CursosComponent, canActivate: [AuthGuard], },
  { path: 'carreras/:idCarrera/cursos/:idCurso/materias', component: MateriasComponent, canActivate: [AuthGuard],  },
  { path: 'carreras/:idCarrera/cursos/:idCurso/materias/:idMateria/estudiantes', component: InscripcionesComponent, canActivate: [AuthGuard], },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
