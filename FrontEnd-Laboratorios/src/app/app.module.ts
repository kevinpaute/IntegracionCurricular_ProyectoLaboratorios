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
// import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    SidebarComponent,
    LaboratoriosComponent,
    LaboratorioModalComponent
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
