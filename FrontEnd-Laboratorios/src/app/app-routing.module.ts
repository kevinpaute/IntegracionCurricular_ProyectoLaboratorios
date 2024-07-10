import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { LaboratoriosComponent } from './laboratorios/laboratorios.component';
import { InventarioComponent } from './laboratorios/inventario/inventario.component';
import { RevisionEquiposComponent } from './laboratorios/revision-equipos/revision-equipos.component';
import { GestionMateriasComponent } from './gestion/gestion-materias/gestion-materias.component';
import { CuentaComponent } from './cuenta/cuenta.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'laboratorios/modulo', component: LaboratoriosComponent, canActivate: [AuthGuard], data: { role: 'administrador' } },  
      { path: 'laboratorios/inventario', component: InventarioComponent, canActivate: [AuthGuard], data: { role: 'administrador' } },
      { path: 'laboratorios/revision', component: RevisionEquiposComponent, canActivate: [AuthGuard], data: { role: 'administrador' } },
      { path: 'gestion/carreras', loadChildren: () => import('./gestion/gestion.module').then(m => m.GestionModule), canActivate: [AuthGuard], data: { role: 'administrador' } },
      { path: 'gestion/mis-materias', component: GestionMateriasComponent, canActivate: [AuthGuard], data: { role: 'docente' } },
      { path: 'cuenta', component: CuentaComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/gestion/carreras', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
