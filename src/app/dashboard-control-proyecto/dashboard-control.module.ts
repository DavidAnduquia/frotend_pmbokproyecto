import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
 
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminFasesComponent } from './admin-fases/admin-fases.component';
import { AdminContribuidoresComponent } from './admin-contribuidores/admin-contribuidores.component';
import { AdminProjectFaseComponent } from './admin-project-fase/admin-project-fase.component';
import { DashboardControlRoutingModule } from './dashboard-control-routing.module';




@NgModule({
  declarations: [
    DashboardComponent,
    AdminFasesComponent,
    AdminContribuidoresComponent,
    AdminProjectFaseComponent,
 
  ],
  imports: [
    CommonModule,
    DashboardControlRoutingModule,
 
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,    
    MatToolbarModule,
   
  ]
})
export class DashboardControlProyectoModule { }
