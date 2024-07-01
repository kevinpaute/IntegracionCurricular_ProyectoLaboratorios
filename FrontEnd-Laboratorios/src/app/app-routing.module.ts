import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMateriaComponent } from './gestion/materias/crear-materia/crear-materia.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { LaboratorioModalComponent } from './laboratorios/laboratorio-modal/laboratorio-modal.component';
import { LaboratoriosComponent } from './laboratorios/laboratorios.component';
import { InventarioComponent } from './laboratorios/inventario/inventario.component';
import { RevisionEquiposComponent } from './laboratorios/revision-equipos/revision-equipos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'laboratorios/modulo', component: LaboratoriosComponent },  
      { path: 'laboratorios/inventario', component: InventarioComponent},
      { path: 'laboratorios/revision', component: RevisionEquiposComponent},
      // { path: 'laboratorios/revision', component: RevisionComponent, canActivate: [AuthGuard], data: { role: 'administrador' } },
      // { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard] },
      // { path: 'asistencias', component: AsistenciasComponent, canActivate: [AuthGuard] },
      // { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard] },
      // { path: 'programas-academicos', component: ProgramasAcademicosComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/gestion/carreras', pathMatch: 'full' },
      { path: 'gestion', loadChildren: () => import('./gestion/gestion.module').then(m => m.GestionModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
