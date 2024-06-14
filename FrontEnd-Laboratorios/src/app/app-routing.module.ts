import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMateriaComponent } from './gestion/materias/crear-materia/crear-materia.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { LaboratorioModalComponent } from './laboratorios/laboratorio-modal/laboratorio-modal.component';
import { LaboratoriosComponent } from './laboratorios/laboratorios.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'laboratorios/modulo', component: LaboratoriosComponent },  // { path: 'laboratorios/inventario', component: InventarioComponent, canActivate: [AuthGuard], data: { role: 'administrador' } },
      // { path: 'laboratorios/revision', component: RevisionComponent, canActivate: [AuthGuard], data: { role: 'administrador' } },
      // { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard] },
      // { path: 'asistencias', component: AsistenciasComponent, canActivate: [AuthGuard] },
      // { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard] },
      // { path: 'programas-academicos', component: ProgramasAcademicosComponent, canActivate: [AuthGuard] },
      { path: 'gestion', loadChildren: () => import('./gestion/gestion.module').then(m => m.GestionModule), canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
