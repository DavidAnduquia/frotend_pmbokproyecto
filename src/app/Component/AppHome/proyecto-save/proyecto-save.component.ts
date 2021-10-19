import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
 
import { Proyecto } from 'src/app/domain/proyectos';
import { tipoProyecto } from 'src/app/domain/tipo_proyecto';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TipoProyectoService } from 'src/app/service/Proyecto/tipo-proyecto.service';
import { DialogComponent } from '../../AppDialog/dialog.component';
import { MisProyectosComponent } from '../mis-proyectos/mis-proyectos.component';
import { ProyectosComponent } from '../proyectos/proyectos.component';

@Component({
  selector: 'app-proyecto-save',
  templateUrl: './proyecto-save.component.html',
  styleUrls: ['./proyecto-save.component.css']
})
export class ProyectoSaveComponent implements OnInit {

  public msg: string = "";
  public showMsg: boolean = false;
  public notificacion: String[] = [];

  public proyecto = new Proyecto();
  public tipos!:tipoProyecto[];

  constructor(
    public proyectos: ProyectosService,
    public tipoProyectoService: TipoProyectoService,
    public router: Router,
    public dialog:MatDialog,

  ) {}

  ngOnInit(): void {this.consultarTipoDeProyectos();}


  public abrirModal(nameError:String,titleModule:String){
    this.dialog.open(DialogComponent, { data : { typeError : nameError, title:titleModule}});
   
  }

  public consultarTipoDeProyectos(){
    this.tipoProyectoService.findAll().subscribe(
      ok => {
          this.tipos = ok;
      }, 
      err => {
        console.log(err.error.error);
      }
    );
  }


  public findAllProyects(){
    this.proyectos.findAll(
   
    ).subscribe(
      data => {
        this.proyectos = data;
      },
      error => {
        console.log("Error en "+ error);
      });
  }


  public buscarProyectos(): void {
    
    this.proyectos.findByEmail(
      localStorage.getItem("usuario") || ''
    ).subscribe(
      data => {
        this.proyectos = data;
   
      },
      error => {
        console.log("Error en " + error);
      });
  }

  

  public guardarNuevoProyecto() {
    this.proyecto.admin = localStorage.getItem("usuario") || '{}';

    
    console.log(this.proyecto);
    this.proyectos.save(this.proyecto).subscribe(
      async ok => {
        this.notificacion[0] = ok;
        this.abrirModal("El proyecto  " + this.proyecto.nombre + " Se ha creado","NOTIFICACIÓN DE CONFIRMACION");
        this.proyecto = new Proyecto();
       
        //window.location.reload();
        //this.router.navigate(['/home']);
        setTimeout(() => {
            window.location.reload();
        }, 1500);



      }, err => {
        console.log(err.error.error);
        
        //this.showMsg=true;
        this.notificacion[0] = "Error al guardar el proyecto";
        this.abrirModal(this.notificacion[0] + this.proyecto.nombre + " tipo de proyecto => " + this.proyecto.tipo_id,"NOTIFICACIÓN DE ERROR");
      }

    );
  }
}
