import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
import { Proyecto } from 'src/app/domain/proyectos';
import { tipoProyecto } from 'src/app/domain/tipo_proyecto';
import { validarActa } from 'src/app/domain/validarActa';
import { ActasService } from 'src/app/service/actas.service';
import { EntradactaService } from 'src/app/service/Actas/entradacta.service';
import { ProyectosService } from 'src/app/service/proyectos.service';
import { TipoProyectoService } from 'src/app/service/Proyecto/tipo-proyecto.service';

@Component({
  selector: 'app-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.css']
})
export class MisProyectosComponent implements OnInit {


  public showMsg: boolean = false;
  public messages: string[] = [""];
  public validarActaDomain!: validarActa;


  public gridColumns = 3;
  public proyectos !: Proyecto[];
  public tipos!:tipoProyecto[];

  public value = ''; // para limpiar la barra de busqueda
  public filterpost = ""; // para sacar el dato a la pipeFilter


  public toggleGridColumns() { // para cambiar la cantidad de CARD  
    this.gridColumns = this.gridColumns === 4 ? 5 : 3;
  }

  
  constructor(
    public proyectoServices: ProyectosService,
    public tipoProyectoService: TipoProyectoService,
    public router: Router,
    public actaService: ActasService,
  ) {  this.buscarProyectos(); }


  ngOnInit(): void {
    this.buscarProyectos();
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


  public buscarProyectos(): void {
    
    this.proyectoServices.findByEmail(
      localStorage.getItem("usuario") || ''
    ).subscribe(
      data => {
        this.proyectos = data;
   
      },
      error => {
        console.log("Error en " + error);
      });
  }



  public delete(id: number): void {
    window.location.reload();
    /*
    this.proyectoServices.delete(id).subscribe(
      ok => {
        //this.showMsg = true;
        this.messages[0] = "Customer se ha elimino Correctamente";
        this.buscarProyectos();
      },
      err => {
        console.log(err.error.error);

        this.showMsg = true;
        this.messages = err.error.error;
      }
    );*/

  }


  public entrarProyecto(nombre: string, idproyecto: number): void {
    localStorage.removeItem('idactas');
    localStorage.removeItem('idreunion');
    localStorage.removeItem('entradaActaId');

    localStorage.setItem("nombreProyecto", nombre);
    localStorage.setItem("idproyecto", idproyecto.toString());
    
    this.router.navigate(['/Control']);
    
  }

 


}


