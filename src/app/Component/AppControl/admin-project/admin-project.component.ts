import { Component, OnInit } from '@angular/core';
import { GrupoDto } from 'src/app/domain/GrupoDto';
import { Proyecto } from 'src/app/domain/proyectos';
import { Rol } from 'src/app/domain/roles';
import { tipofases } from 'src/app/domain/tipofases';
import { User } from 'src/app/domain/user';
import { Usuario } from 'src/app/domain/usuario';
import { GrupoService } from 'src/app/service/grupo.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css']
})
export class AdminProjectComponent implements OnInit {

  public mensaje !: String;
  public usuariosLista !: Usuario[];

  public tipoFases!: tipofases[]; 

  public tipoRol !: Rol[];
  public FechaInicio !: Date;
  public FechaFin !: Date;
  public grupoDto !:GrupoDto;
  
  public dto!: GrupoDto;
  public idtipoRol !:number;
  public nombreRol !:String;
  public radio !: boolean;
  public RadioOpciones: boolean[] = [true, false];
  public usuario !:string;

  public data !: Array<any>;




  constructor(
    
    public UsuarioService: UsuarioService,
    public grupoService: GrupoService,
    public router:Router

  ) {  this.data = [
    { firstName: 'John', lastName: 'Doe', age: '35' },
    { firstName: 'Michael', lastName: 'Smith', age: '39' },
    { firstName: 'Michael', lastName: 'Jordan', age: '45' },
    { firstName: 'Tanya', lastName: 'Blake', age: '47' }
  ];}

  ngOnInit(): void {
    this.dto = new GrupoDto(0,0,0,"",0,"");
    this.radio = true;
    this.BuscarUsuario();
    this.BuscarRoles();
  }

  async BuscarUsuario() {
    await this.UsuarioService.findAll().subscribe(
      data => {
        console.log('-Z ',data);

        this.usuariosLista = data;
        console.log('-Z ',this.usuariosLista);
      },
      error => {
        console.log(error);
      }
    );
  }
  async BuscarRoles() {
    await this.grupoService.tipoDeRoles().subscribe(
      data => {
        
        this.tipoRol =data
        console.log(this.tipoRol);

      }, error => {
        console.log(error);

      }
    );
  }

  public matricularUsuario():void{
    this.mensaje = "";
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);
    this.dto.idproyecto= idProyecto
    if(this.dto.email == null || this.dto.email ==="" || this.dto.email == undefined ){
      this.mensaje = "Error: No ha especificado el usuario que desea matricular";

    }
    if(this.dto.idNombrerol){
      this.dto.idrol ==0;
    }
    this.grupoService.matricular(this.dto).subscribe(
      data=>{
        setTimeout(() => {
          this.dto = new GrupoDto(0,0,0,"",0,"");
          window.location.reload();
        }, 4000);
        
        this.dto = data
        // Mensaje debe mostrarse en grande
        this.mensaje = `El usuario : ${data.email}, se registro con el rol  ${this.tipoRol[data.idrol].nombrerol}`;
        
        
      },
      error=>{
        console.log('ERROR: ',error);
        this.mensaje= error.error.message;
        
        
      }
    );

  }
  /*async Matricular(){
    this.
  }*/

  public VolverAControl():void{
    this.router.navigate(['/Control']);
    
  }
}
