import { Component, OnInit } from '@angular/core';
 
import { MatDialog } from '@angular/material/dialog';
 
 import { Router } from '@angular/router';
import { Usuario } from 'src/app/domain/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DialogComponent } from '../../AppDialog/dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    this.Mensaje=false;
  }

  constructor(public usuarioService: UsuarioService, public dialog:MatDialog,public router:Router) { }




  public Mensaje:boolean=false;
  public notificacion: string[] = [""];
  public usuarios: Usuario= new Usuario("","","","","") ;


  public confirModule:String="NOTIFICACIÓN DE CONFIRMACION";
  public errorModule:String="NOTIFICACIÓN DE ERROR";


  public abrirModal(nameError:String,titleModule:String){
    this.dialog.open(DialogComponent, { data : { typeError : nameError, title:titleModule}});
  }


  public verificarCampos(){
    if(this.usuarios.email.length > 0 && this.usuarios.password.length > 0 && this.usuarios.nombre) {
      return true;
    }
    return false;
  }

  public registrarUsuario(): void {

    this.usuarios.activo="Y";
    this.usuarios.token="generico123456789";


    console.log(this.usuarios);
 
    if(this.verificarCampos() == true){
      this.notificacion = [""];
      console.log("Option de guardado ");
      
     
      this.usuarioService.save(this.usuarios).subscribe(
        ok => {
          //this.showMsg=true;
          this.Mensaje=true;
          this.notificacion[0] = "Customer " +  this.usuarios.email + " Se grabo Correctamente";
          this.dialog.open(DialogComponent, { data : { typeError : this.notificacion[0] , title:this.confirModule}});
          this.router.navigate(['/login']);
        },
        err => {
         // console.log(err.error.error);
 
          this.notificacion[0] = "Error Al guardar el Ususario";
          this.dialog.open(DialogComponent, { data : { typeError : this.notificacion[0] , title:this.errorModule}});
       
        }
      );
    }else {
     // this.dialog.open(DialogComponent, { data : { typeError : this.notificacion[0] , title:this.errorModule}});
      this.abrirModal("Porfavor llene los campos vacios" ,this.errorModule);

    }
 
  
  }


}
