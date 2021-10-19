import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminFasesComponent } from './admin-fases/admin-fases.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminProjectFaseComponent } from './admin-project-fase/admin-project-fase.component';
import { AdminContribuidoresComponent } from './admin-contribuidores/admin-contribuidores.component';
import { SeguimientoProyectoComponent } from '../Component/AppHome/seguimiento-proyecto/seguimiento-proyecto.component';

const routes: Routes =  [
 {
   path: '',
   component: DashboardComponent,
   children: [
      
     { path: 'contribuidores' , component: AdminContribuidoresComponent},
     { path: 'proyectofases' , component: AdminProjectFaseComponent},
     { path: 'controlfases' , component: AdminFasesComponent},    
     { path: 'seguimiento' , component: SeguimientoProyectoComponent}
   ]
 },
 {
  path: '**',
  redirectTo: '/contribuidores',
  pathMatch: 'full'
 }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class DashboardControlRoutingModule { }
