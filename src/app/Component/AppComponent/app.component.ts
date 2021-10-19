import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthLoginService } from 'src/app/service/auth-login.service';
import { NotificacionesService } from 'src/app/service/notificaciones.service';

//import { AuthGuard } from './guard/auth.guard';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(public router: Router, public authlogin: AuthLoginService, public notificaciones: NotificacionesService) { }


  ngOnInit(): void {
    
  }

  

/*
  public async  contarMensajes(){
    let correo = localStorage.getItem('usuario') || '';
    if(correo === ''){


    }else{
      try {
        this.mensjaes =await this.serviciosGrupo.contarMensajes(correo).toPromise();
      } catch (error) {
        console.error('\n',error,'\n' );
        
      }

    }
    

  }*/
}
