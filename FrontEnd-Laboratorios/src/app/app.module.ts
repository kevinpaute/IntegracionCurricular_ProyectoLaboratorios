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
// import { NgxPaginationModule } from 'ngx-pagination';


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
    RevisionEquipoDetailModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule, // Asegúrate de que HttpClientModule está en las importaciones
    // NgxPaginationModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
