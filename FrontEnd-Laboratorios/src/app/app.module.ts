import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionModule } from './gestion/gestion.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';  // Importa HttpClientModule

import { AuthService } from './services/login/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptorService } from './services/login/auth-interceptor.service';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LaboratoriosComponent } from './laboratorios/laboratorios.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LaboratorioModalComponent } from './laboratorios/laboratorio-modal/laboratorio-modal.component';
import { InventarioComponent } from './laboratorios/inventario/inventario.component';
import { RevisionEquiposComponent } from './laboratorios/revision-equipos/revision-equipos.component';
import { InventarioModalComponent } from './laboratorios/inventario/inventario-modal/inventario-modal.component';
import { RevisionEquipoModalComponent } from './laboratorios/revision-equipos/revision-equipo-modal/revision-equipo-modal.component';
import { RevisionEquipoDetailModalComponent } from './laboratorios/revision-equipos/revision-equipo-detail-modal/revision-equipo-detail-modal.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { ReservasComponent } from './reservas/reservas.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ReservasDocenteComponent } from './reservas-docente/reservas-docente.component';
//import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
// import { NgxPaginationModule } from 'ngx-pagination';
// FullCalendarModule.registerPlugins([
//   dayGridPlugin,
//   timeGridPlugin,
//   interactionPlugin,
// ]);

import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AsistenciaDocenteComponent } from './asistencia-docente/asistencia-docente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QRCodeModule } from 'angularx-qrcode';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    LaboratoriosComponent,
    LaboratorioModalComponent,
    InventarioComponent,
    RevisionEquiposComponent,
    InventarioModalComponent,
    RevisionEquipoModalComponent,
    RevisionEquipoDetailModalComponent,
    CuentaComponent,
    ReservasComponent,
    ReservasDocenteComponent,
    AsistenciaDocenteComponent,
    BitacoraComponent,
    MainLayoutComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule, // Asegúrate de que HttpClientModule está en las importaciones
    // NgxPaginationModule
    FullCalendarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    }),
    SweetAlert2Module.forRoot(),
    QRCodeModule,


    TableModule,
    PaginatorModule,
    InputTextModule,
    ButtonModule,
    CardModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
