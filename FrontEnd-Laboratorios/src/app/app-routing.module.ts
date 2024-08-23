import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LaboratoriosComponent } from './laboratorios/laboratorios.component';
import { InventarioComponent } from './laboratorios/inventario/inventario.component';
import { RevisionEquiposComponent } from './laboratorios/revision-equipos/revision-equipos.component';
import { GestionMateriasComponent } from './gestion/gestion-materias/gestion-materias.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservasDocenteComponent } from './reservas-docente/reservas-docente.component';
import { AsistenciaDocenteComponent } from './asistencia-docente/asistencia-docente.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { UsuariosComponent } from './gestion/usuarios/usuarios.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BitacoraComponent } from './bitacora/bitacora.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password/:token', component: ResetPasswordComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'laboratorios/modulo', component: LaboratoriosComponent, canActivate: [AuthGuard], data: { roles: ['administrador', 'laboratorista'] } },  
      { path: 'laboratorios/inventario', component: InventarioComponent, canActivate: [AuthGuard], data: { roles: ['administrador', 'laboratorista'] } },
      { path: 'laboratorios/revision', component: RevisionEquiposComponent, canActivate: [AuthGuard], data: { roles: ['administrador', 'laboratorista'] } },
      { path: 'gestion/carreras', loadChildren: () => import('./gestion/gestion.module').then(m => m.GestionModule), canActivate: [AuthGuard], data: { roles: ['administrador', 'laboratorista'] } },
      { path: 'gestion/mis-materias', component: GestionMateriasComponent, canActivate: [AuthGuard], data: { roles: ['docente'] } },
      { path: 'reservas', component: ReservasComponent, canActivate: [AuthGuard], data: { roles: ['administrador', 'laboratorista'] } },
      { path: 'reservas-docente', component: ReservasDocenteComponent, canActivate: [AuthGuard], data: { roles: ['docente'] } },
      { path: 'cuenta', component: CuentaComponent, canActivate: [AuthGuard], data: { roles: ['administrador', 'laboratorista','docente', ] }},
      { path: 'gestion/usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { roles: ['administrador']}},
      { path: 'asistencia', component: AsistenciaDocenteComponent, canActivate: [AuthGuard], data: { roles: ['docente', 'laboratorista'] } },
      { path: 'bitacoras', component: BitacoraComponent, canActivate: [AuthGuard], data: { roles: ['administrador', 'laboratorista'] } },
      { path: '', redirectTo: '/gestion/carreras', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Redirección por defecto a login si no coincide ninguna ruta

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
