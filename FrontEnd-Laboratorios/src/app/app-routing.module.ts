import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMateriaComponent } from './gestion/materias/crear-materia/crear-materia.component';

const routes: Routes = [
  { path: 'gestion/materias/crear', component: CrearMateriaComponent },
  { path: 'gestion', loadChildren: () => import('./gestion/gestion.module').then(m => m.GestionModule) },
  { path: '', redirectTo: '/gestion', pathMatch: 'full' },
  { path: '**', redirectTo: 'gestion' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
