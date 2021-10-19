import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Component/AppHome/Home/home.component';
import { MisProyectosComponent } from './Component/AppHome/mis-proyectos/mis-proyectos.component';
import { ProyectosComponent } from './Component/AppHome/proyectos/proyectos.component';
import { LoginComponent } from './Component/AppAuth/login/login.component';
import { ProyectoSaveComponent } from './Component/AppHome/proyecto-save/proyecto-save.component';
import { ParticipacionesComponent } from './Component/AppHome/participaciones/participaciones.component';
import { RegisterComponent } from './Component/AppAuth/register/register.component';
import { SeguimientoProyectoComponent } from './Component/AppHome/seguimiento-proyecto/seguimiento-proyecto.component';
//import { PlanGestioBeneficio } from './domain/plangestionbeneficio';
import { AuthGuard } from './guard/auth.guard';

/* AppPmbokStep ACTAS */
import { ActasComponent } from './Component/AppPmbokStep/actas/actas.component';
import { EntradasComponent } from './Component/AppPmbokStep/actas/entradas/entradas.component';
import { HerramientasActaComponent } from './Component/AppPmbokStep/actas/herramientas-acta/herramientas-acta.component';
import { CasoNegocioComponent } from './Component/AppPmbokStep/actas/caso-negocio/caso-negocio.component';
/* AppPresentacion ACTAS */
import { ActasVistaComponent } from './Component/AppPresentacion/actas/actas-vista/actas-vista.component';
import { EntradaComponent } from './Component/AppPresentacion/actas/entrada/entrada.component';
import { HerramientasComponent } from './Component/AppPresentacion/actas/herramientas/herramientas.component';
import { CasoNegociosComponent } from './Component/AppPresentacion/actas/caso-negocios/caso-negocios.component';
import { PlanGestionComponent } from './Component/AppPresentacion/actas/plan-gestion/plan-gestion.component';
/* AppPresentacion PDP */
import { EntradaspdpComponent } from './Component/AppPmbokStep/pdp/entradaspdp/entradaspdp.component';
import { HeramientasPdpComponent } from './Component/AppPmbokStep/pdp/heramientas-pdp/heramientas-pdp.component';
import { PdpComponent } from './Component/AppPmbokStep/pdp/pdp.component';

/* AppPresentacion PDP */
import { EntradaspgaComponent } from './Component/AppPmbokStep/pga/entradaspga/entradaspga.component';
import { HerramientapgaComponent } from './Component/AppPmbokStep/pga/herramientapga/herramientapga.component';
import { PgaComponent } from './Component/AppPmbokStep/pga/pga.component';

/* App Control */
import { AdminProjectFasesComponent } from './Component/AppControl/admin-project-fases/admin-project-fases.component';
import { AdminProjectComponent } from './Component/AppControl/admin-project/admin-project.component';
import { AppMessageComponent } from './Component/AppControl/app-message/app-message.component';
import { ControlFasesComponent } from './Component/AppControl/control-fases/control-fases.component';
import { ControlParticipacionesComponent } from './Component/AppControl/control-participaciones/control-participaciones.component';
import { ControlAdminUserComponent } from './Component/AppControl/control-admin-user/control-admin-user.component';
import { NotificacionesControlComponent } from './Component/AppControl/notificaciones-control/notificaciones-control.component';
import { SeguimientoProyectoControlComponent } from './Component/AppControl/seguimiento-proyecto-control/seguimiento-proyecto-control.component';
 
import { PlanGestionBeneficiosComponent } from './Component/AppPmbokStep/actas/plan-gestion-beneficios/plan-gestion-beneficios.component';

const routes: Routes = [
  { path: '',  component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'misproyectos', component: MisProyectosComponent, canActivate: [AuthGuard] },
  { path: 'proyectos', component: ProyectosComponent, canActivate: [AuthGuard] },
  { path: 'proyecto-save', component: ProyectoSaveComponent, canActivate: [AuthGuard] },
  { path: 'participaciones', component: ParticipacionesComponent, canActivate: [AuthGuard] },

  /**
   * actas de inicion
   */
  { path: 'Actas', component: ActasComponent },
  { path: 'actas/entradas', component: EntradasComponent },
  { path: 'actas/entradas/caso-negocio', component: CasoNegocioComponent },
  { path: 'actas/herramientas', component: HerramientasActaComponent },
  { path: 'actas/entradas/plan-gestion-beneficio', component: PlanGestionBeneficiosComponent },

  /**
   * Vistas de presentacion de Informacion de las Actas
   */

  { path: 'vistaActas', component: ActasVistaComponent },
  { path: 'vistaActas/entradas', component: EntradaComponent },
  { path: 'vistaActas/entradas/caso-negocio', component: CasoNegociosComponent },
  { path: 'vistaActas/entradas/plan-gestion-beneficio', component: PlanGestionComponent },
  { path: 'vistaActas/herramientas', component: HerramientasComponent },

  /**
   * Fin actas de inicion
   */

  { path: 'seguimiento-proyecto', component: SeguimientoProyectoComponent, canActivate: [AuthGuard] },

  /**
   *  PDP
   */
  { path: 'Pdp', component: PdpComponent },
  { path: 'pdp/entradasPdp', component: EntradaspdpComponent },
  { path: 'pdp/herramientasPdp', component: HeramientasPdpComponent },
  /**
  *  PGA
  */
  { path: 'Pga', component: PgaComponent },
  { path: 'Pga/entradasPdp', component: EntradaspgaComponent },
  { path: 'Pga/herramientasPga', component: HerramientapgaComponent },
  /**
  *  PGA 
  */  

  {path: 'ControlAdminProject', component:AdminProjectComponent}, // Matricular Gente a un proyecto
  {path: 'ControlMessage', component:AppMessageComponent}, // Buzón de alertas
  {path: 'ControlFases', component: AdminProjectFasesComponent }, // Agendar as reuniones con el grupo de trabajo
  {path: 'Control-Reuniones-Por-Fase', component: ControlFasesComponent }, // Agendar as reuniones con el grupo de trabajo
  {path: 'Mensajes', component: NotificacionesControlComponent }, // Muestra Los mensajes x usuario
  {path: 'Control', component: ControlAdminUserComponent }, // Agendar as reuniones con el grupo de trabajo
  { path: 'Control-seguimiento-proyecto', component: SeguimientoProyectoControlComponent},
  { path: 'Control-Participacion-proyecto', component: ControlParticipacionesComponent},// vista para los integrantes de un grupo de trabjao
  

  // loading Lazy module

 { path: 'ControlProyecto',
  loadChildren:() => import('./dashboard-control-proyecto/dashboard-control.module').then( m => m.DashboardControlProyectoModule)
 }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
