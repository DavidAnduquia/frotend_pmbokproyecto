import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/domain/proyectos';
import { tipoProyecto } from 'src/app/domain/tipo_proyecto';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TipoProyectoService } from 'src/app/service/Proyecto/tipo-proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public gridColumns = 3;
  

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
 
  constructor(
    public proyectoServices: ProyectosService,
    public tipoProyectoService: TipoProyectoService,
    public router: Router) { }

    public proyectos!:Proyecto[];
    public tipos!:tipoProyecto[];
    public filterpost = "";

    public clasificacion:string="";

  ngOnInit(): void {
    this.findAllProyects();
    this.consultarTipoDeProyectos();
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
    this.proyectoServices.findAll().subscribe(
      data => {
        this.proyectos = data;
      },
      error => {
        console.log("Error en "+ error);
      });
  }


}
