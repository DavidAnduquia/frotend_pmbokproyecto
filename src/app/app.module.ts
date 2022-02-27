 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// App 
import { AppComponent } from './Component/AppComponent/app.component';
import { LoginComponent } from './Component/AppAuth/login/login.component';
import { RegisterComponent } from './Component/AppAuth/register/register.component';
import { HomeComponent } from './Component/AppHome/Home/home.component';
import { ProyectoSaveComponent } from './Component/AppHome/proyecto-save/proyecto-save.component';
import { SeguimientoProyectoComponent } from './Component/AppHome/seguimiento-proyecto/seguimiento-proyecto.component';
import { ProyectosComponent } from './Component/AppHome/proyectos/proyectos.component';
import { MisProyectosComponent } from './Component/AppHome/mis-proyectos/mis-proyectos.component';

// Acta de constitucion
import { EntradaComponent } from './Component/AppPresentacion/actas/entrada/entrada.component';
import { HerramientasComponent } from './Component/AppPresentacion/actas/herramientas/herramientas.component';
import { CasoNegociosComponent } from './Component/AppPresentacion/actas/caso-negocios/caso-negocios.component';
import { ActasVistaComponent } from './Component/AppPresentacion/actas/actas-vista/actas-vista.component';
import { PlanGestionComponent } from './Component/AppPresentacion/actas/plan-gestion/plan-gestion.component';
import { ActasComponent } from './Component/AppPmbokStep/actas/actas.component';
import { EntradasComponent } from './Component/AppPmbokStep/actas/entradas/entradas.component';
import { CasoNegocioComponent } from './Component/AppPmbokStep/actas/caso-negocio/caso-negocio.component';
import { PlanGestionBeneficiosComponent } from './Component/AppPmbokStep/actas/plan-gestion-beneficios/plan-gestion-beneficios.component';
import { HerramientasActaComponent } from './Component/AppPmbokStep/actas/herramientas-acta/herramientas-acta.component';

// PDP
import { EntradaspdpComponent } from './Component/AppPmbokStep/pdp/entradaspdp/entradaspdp.component';
import { PdpComponent } from './Component/AppPmbokStep/pdp/pdp.component';
import { SalidasProcesosPdpComponent } from './Component/AppPmbokStep/pdp/salidas-procesos-pdp/salidas-procesos-pdp.component';
import { VistaPdpComponent } from './Component/AppPresentacion/pdp/vista-pdp/vista-pdp.component';
import { VistaEntradaPdpComponent } from './Component/AppPresentacion/pdp/vista-entrada-pdp/vista-entrada-pdp.component';
import { VistaHerramientaPdpComponent } from './Component/AppPresentacion/pdp/vista-herramienta-pdp/vista-herramienta-pdp.component';
import { HeramientasPdpComponent } from './Component/AppPmbokStep/pdp/heramientas-pdp/heramientas-pdp.component';

// PGA
import { VistaEntradaPgaComponent } from './Component/AppPresentacion/pga/vista-entrada-pga/vista-entrada-pga.component';
import { VistaHerramientaPgaComponent } from './Component/AppPresentacion/pga/vista-herramienta-pga/vista-herramienta-pga.component';
import { VistaPgaComponent } from './Component/AppPresentacion/pga/vista-pga/vista-pga.component';
import { PgaComponent } from './Component/AppPmbokStep/pga/pga.component';
import { EntradaspgaComponent } from './Component/AppPmbokStep/pga/entradaspga/entradaspga.component';
import { HerramientapgaComponent } from './Component/AppPmbokStep/pga/herramientapga/herramientapga.component';

// Otros requerimientos
import { DialogComponent } from './Component/AppDialog/dialog.component';
import { AdminProjectComponent } from './Component/AppControl/admin-project/admin-project.component';
import { AppMessageComponent } from './Component/AppControl/app-message/app-message.component';
import { AdminProjectFasesComponent } from './Component/AppControl/admin-project-fases/admin-project-fases.component';
import { ControlFasesComponent } from './Component/AppControl/control-fases/control-fases.component';
import { ControlAdminUserComponent } from './Component/AppControl/control-admin-user/control-admin-user.component';
import { NotificacionesControlComponent } from './Component/AppControl/notificaciones-control/notificaciones-control.component';
import { SeguimientoProyectoControlComponent } from './Component/AppControl/seguimiento-proyecto-control/seguimiento-proyecto-control.component';
import { ParticipacionesComponent } from './Component/AppHome/participaciones/participaciones.component';
import { ControlParticipacionesComponent } from './Component/AppControl/control-participaciones/control-participaciones.component';

// Filtros PIPE 
import { FilterProyectoPipe } from './pipes/filter-proyecto.pipe';
 
// Componentes Angular
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterilaModule } from './material.modules';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
 import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';
import { InterceptorService } from './service/interceptor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
 
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PdpComponent,
    EntradaspdpComponent,
    HeramientasPdpComponent,
    HomeComponent,
    ProyectoSaveComponent,
    SeguimientoProyectoComponent,
    ProyectosComponent,
    MisProyectosComponent,
    ActasComponent,
    EntradasComponent,
    CasoNegocioComponent,
    PlanGestionBeneficiosComponent,
    HerramientasActaComponent,
    EntradaComponent,
    HerramientasComponent,
    CasoNegociosComponent,
    ActasVistaComponent,
    PlanGestionComponent,

    EntradaspdpComponent,
    HeramientasPdpComponent,

    DialogComponent,

    FilterProyectoPipe,
    EntradaspdpComponent,
    SalidasProcesosPdpComponent,
    PgaComponent,
    EntradaspgaComponent,
    HerramientapgaComponent,

    VistaEntradaPdpComponent,
    VistaHerramientaPdpComponent,
    VistaEntradaPgaComponent,
    VistaHerramientaPgaComponent,
    VistaPdpComponent,
    VistaPgaComponent,

    AdminProjectComponent,
    AppMessageComponent,
    AdminProjectFasesComponent,
    ControlFasesComponent,
    ControlAdminUserComponent,
    NotificacionesControlComponent,
    SeguimientoProyectoControlComponent,
    ParticipacionesComponent,
    ControlParticipacionesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //---------------------
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    NgxSpinnerModule,
    //Agnular Material
    MaterilaModule,
    MatFormFieldModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    //MatTableModule
    MatDialogModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    NgxSpinnerModule,

    MatIconModule,
   
    MatExpansionModule,
    MDBBootstrapModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,

    MatMenuModule,
    MatRadioModule,
    MatTableModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSortModule,
 
  
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
