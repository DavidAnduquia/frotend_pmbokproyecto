import { element } from 'protractor';
import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipDirective } from 'angular-bootstrap-md';
import { EntradactaService } from 'src/app/service/Actas/entradacta.service';
import { PdpServicesService } from 'src/app/service/PdpService/pdp-services.service';
import { PgaServiceService } from 'src/app/service/PgaService/pga-service.service';

@Component({
  selector: 'app-control-admin-user',
  templateUrl: './control-admin-user.component.html',
  styleUrls: ['./control-admin-user.component.css']
})
export class ControlAdminUserComponent implements OnInit {
  // window.location.reload();
  constructor(public router: Router,
    public entradaDeActaServices: EntradactaService,
    public pgaServiceService: PgaServiceService,
    public pdpServicesService: PdpServicesService) { }


    showControlAdmin = true;
    showControlFases = false;
    showControlReuniones = false;
    showSeguimiento =false;

  ngOnInit(): void {
    // Validan si ya se cumplio el registo de datos por cada uno de los modulos
    this.validarActa();
    this.validarPDP();
    this.ValidarPGA();
  }



  // Este metodo es para el menu desplegable
  public cambiarEstado(valor1:number) {
    if(valor1==1){
      if(this.showControlFases==false && this.showControlReuniones==false && this.showSeguimiento==false){
        this.showControlAdmin = true;
      }else{
        this.showControlAdmin = !this.showControlAdmin;
      }
      this.showControlFases = false;
      this.showControlReuniones = false;
      this.showSeguimiento =false;
    }else if(valor1==2){
      if(this.showControlAdmin==false && this.showControlReuniones==false && this.showSeguimiento==false){
        this.showControlFases = true;
      }else{
        this.showControlFases = !this.showControlFases;
      }
      this.showControlAdmin = false;
      this.showControlReuniones = false;
      this.showSeguimiento =false;
    }else if(valor1==3){
      if(this.showControlAdmin==false && this.showControlFases==false && this.showSeguimiento==false){
        this.showControlReuniones = true;
      }else{
        this.showControlReuniones = !this.showControlReuniones;
      }
      this.showControlAdmin = false;
      this.showControlFases=false;
      this.showSeguimiento =false;
      
    }else if(valor1==4){
      if(this.showControlAdmin==false && this.showControlReuniones==false && this.showControlFases==false){
        this.showSeguimiento = true;
      }else{
        this.showSeguimiento = !this.showSeguimiento;
      }
   
      this.showControlAdmin = false;
      this.showControlFases = false;
      this.showControlReuniones = false;
    }

  }

 


  // Métodos implementados en seguimiento-proyecto 
  public async validarActa() {
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);
    await this.entradaDeActaServices.validarValoresActa(idProyecto).subscribe(
      data => {
        localStorage.setItem('datosActa', JSON.stringify(data));
      },
      err => {
        console.log('error en referencia ');
        console.log(err);
        console.log(err.err);
      }
    );


  }

  public async validarPDP() {
    console.log('----------  validarPDP() {()');
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);

    await this.pdpServicesService.validarPdp(idProyecto).subscribe(
      data => {
        localStorage.setItem('datosPDP', JSON.stringify(data));

      }, err => {
        console.log('error en referencia ');
        console.log(err);
        console.log(err.err);

      }
    );
  }

  public async ValidarPGA() {
    console.log(' ValidarPGA() { ');
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);
    await this.pgaServiceService.validarPga(idProyecto).subscribe(
      data => {
        localStorage.setItem('datosPGA', JSON.stringify(data));

      }, err => {
        console.log('error en referencia ');
        console.log(err);
        console.log(err.err);

      }
    );
  }


   

  

}
