 
import { Component, ContentChild, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
 

import { Router } from '@angular/router'; 
import { AppComponent } from 'src/app/Component/AppComponent/app.component';

import { Usuario } from 'src/app/domain/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { DialogComponent } from '../../AppDialog/dialog.component';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = "";
  public password: string = "";

  public msg: string = "";
  public showMsg: boolean = false;
  public messages: String[] = [];
  public usuarios: Usuario= new Usuario("","","","","") ;
  
  public title= "NOTIFICACIÓN DE ERROR";

  
  
  public fieldTextType: boolean = false;
  public inp1:boolean = false;
  public inp2:boolean = false;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router,
    public dialog:MatDialog,
 
    ) { }

    
  
  ngOnInit(): void {
     localStorage.clear();
  }
  

  public abrirModal(nameError:String,titleModule:String){
    this.dialog.open(DialogComponent, { data : { typeError : nameError, title:titleModule}});
  }


 
  public toggleFieldTextType():void {
    this.fieldTextType = !this.fieldTextType;
  }
 
  public verificarCampos(){
    if(this.usuarios.email.length > 0 && this.usuarios.password.length > 0){
      return true;
    }
    return false;
  }

  public ingresar(): void {
      if(this.verificarCampos() == true ){
        this.usuarioService.findById(this.usuarios.email).subscribe(
          ok=>{
            // console.log('****************');
            // console.log(ok);
            this.messages[0]="Usuario encontrado";
          
         if(ok.activo === 'N'){
          this.messages[0]="Cuenta bloqueada ";
          this.abrirModal("Su cuenta esta bloqueada \n No tiene acceso" ,this.title);

         }else{
          if (ok.password == this.usuarios.password){
          
            localStorage.setItem("usuario",this.usuarios.email);
            localStorage.setItem("pass",this.usuarios.password);
            this.router.navigate(['/home']);
            
          }else{
           this.messages[0]="Error en constraseña";
         
           this.abrirModal("Porfavor verifica la contraseña",this.title);
          }
         }
            
          },
          err=>{
            console.log(this.usuarios.email);
            console.log(err.error);
            this.showMsg=true;
           // this.messages=err.error.error;
            //this.messages[0]="No se encuentra el usuario";
            this.abrirModal("No se encuentra el usuario",this.title);
    
          }
        );
      }else{
        this.abrirModal("Porfavor llene los campos vacios" ,this.title);

      }
     
 
   
  }
}
