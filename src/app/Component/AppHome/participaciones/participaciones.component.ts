import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/domain/proyectos';
import { tipoProyecto } from 'src/app/domain/tipo_proyecto';
import { TipoProyectoService } from 'src/app/service/Proyecto/tipo-proyecto.service';
import { ProyectosService } from 'src/app/service/proyectos.service';

@Component({
  selector: 'app-participaciones',
  templateUrl: './participaciones.component.html',
  styleUrls: ['./participaciones.component.css']
})
export class ParticipacionesComponent implements OnInit {

  public gridColumns = 3;
  
  public proyectos!:Proyecto[];
  public tipos!:tipoProyecto[];
  public filterpost = "";

  public clasificacion:string="";

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
 
  constructor(  public proyectoServices: ProyectosService,
    public tipoProyectoService: TipoProyectoService,
    public router: Router) { }

  ngOnInit(): void { 
  this.participaciones();
  }

  public participaciones(){
    let  email = localStorage.getItem('usuario') || '';
    if(email===''){

    }else{
      this.proyectoServices.BuscarParticipaciones(email).subscribe(
        data => {
          this.proyectos = data;
        },
        error => {
          console.log("Error en "+ error);
        });
    }
  }
  public entrarProyecto(poryecto:Proyecto){
    console.log(poryecto);
    localStorage.setItem('proyectoParticipacion', JSON.stringify(poryecto));
    this.router.navigate(['/Control-Participacion-proyecto']);
    
    
  }
}
