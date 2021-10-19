import { Component, OnInit } from '@angular/core';
import { EntradactaService } from 'src/app/service/Actas/entradacta.service';
import { PdpServicesService } from 'src/app/service/PdpService/pdp-services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PgaServiceService } from 'src/app/service/PgaService/pga-service.service';

@Component({
  selector: 'app-seguimiento-proyecto',
  templateUrl: './seguimiento-proyecto.component.html',
  styleUrls: ['./seguimiento-proyecto.component.css']
})
export class SeguimientoProyectoComponent implements OnInit {

  public estado: boolean = false; 


  public actaDeConstitucionDelProyecto: Boolean = false;
  public planParaLaDireccionDeProyectos: Boolean = false;
  public planificacionParaLaGestionDelAlcance: Boolean = false;

  public checkEstadoActaActivo: Boolean = false;
  public checkEstadoPdpActivo: Boolean = false;
  public checkEstadoPgaActivo: Boolean = false;
  //public checkEstadoPgcActivo: Boolean = false;


  public panelOpenState = false;

  /*
  acta
  casoNegocioValidate
  entradactaValidate
  herramientasValidate
  planValidate*/
  constructor(
    public spinnerService: NgxSpinnerService,
    public entradaDeActaServices: EntradactaService,
    public pgaServiceService: PgaServiceService,
    public pdpServicesService: PdpServicesService

  ) { 

  }

  ngOnInit(): void {

    // Validan si ya se cumplio el registo de datos por cada uno de los modulos
    // this.validarActa();
    this.checkEstadoActa();
    // this.validarPDP();
    this.checkEstadoPDP();
    // this.ValidarPGA();
    this.checkEstadoPGA();
  
  }


  public checkEstadoActa() {

    //this.validarActa();
    var data = JSON.parse(localStorage.getItem('datosActa') || '{}');

    if (data.casoNegocioValidate == true &&  data.entradactaValidate == true && data.herramientasValidate == true &&
      data.planValidate == true) {
        this.actaDeConstitucionDelProyecto= true;
        this.checkEstadoActaActivo=true;
    }
  }
  /*******************************************        */
  async validarActa() {
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);
    await this.entradaDeActaServices.validarValoresActa(idProyecto).subscribe(
      data => {
        localStorage.setItem('datosActa', JSON.stringify(data));
        this.checkEstadoActa();
       },
      err => {
        console.log('error en referencia ');
        console.log(err);
        console.log(err.err);
      }
    );


  }

  public checkEstadoPDP() {

    //this.validarPDP();

    var data = JSON.parse(localStorage.getItem('datosPDP') || '{}');

    if (data.entradactaPdpValidate == true &&  data.herramientasPdpValidate == true ) {
        this.planParaLaDireccionDeProyectos=true;
        this.checkEstadoPdpActivo=true;
    }
  }

  

  async validarPDP() {
    console.log('----------  validarPDP() {()');
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);

    await this.pdpServicesService.validarPdp(idProyecto).subscribe(
      data => {
        localStorage.setItem('datosPDP', JSON.stringify(data));
        this.checkEstadoPDP();
      }, err => {
        console.log('error en referencia ');
        console.log(err);
        console.log(err.err);

      }
    );
  }

  public checkEstadoPGA() {

   // this.validarPDP();

    var data = JSON.parse(localStorage.getItem('datosPGA') || '{}');

    if (data.pga == true && data.entradactaPgaValidate == true &&  data.herramientasPgaValidate == true ) {
        this.planificacionParaLaGestionDelAlcance=true;
        this.checkEstadoPgaActivo=true;
    }
  }


  async ValidarPGA() {
    console.log(' ValidarPGA() { ');
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);
    await this.pgaServiceService.validarPga(idProyecto).subscribe(
      data => {
        localStorage.setItem('datosPGA', JSON.stringify(data));
        this.checkEstadoPGA();
      }, err => {
        console.log('error en referencia ');
        console.log(err);
        console.log(err.err);

      }
    );

  }




  /*******************************************        */
  VerificarEstados() {
    /*
    this.actaDeConstitucionDelProyecto = false;
    this.planParaLaDireccionDeProyectos = false;
    this.planificacionParaLaGestionDelAlcance = false;

    this.checkEstadoActaActivo = false;
    this.checkEstadoPdpActivo = false;
    this.checkEstadoPgaActivo = false;
    */

    var data1 = JSON.parse(localStorage.getItem('datosActa') || '{}');
    var data2 = JSON.parse(localStorage.getItem('datosPDP') || '{}');
    var data3 = JSON.parse(localStorage.getItem('datosPGA') || '{}');

    if (data1.acta &&
      data1.casoNegocioValidate &&
      data1.entradactaValidate &&
      data1.herramientasValidate &&
      data1.planValidate
    ) {
      console.log('datosActa FULL');
 
      if (data1.acta  &&  data1.casoNegocioValidate  && data1.entradactaValidate  &&  data1.herramientasValidate &&  data1.planValidate) {
        this.actaDeConstitucionDelProyecto = true;
      }
      //this.actaDeConstitucionDelProyecto = true;
      this.checkEstadoActaActivo = true;
      this.checkEstadoPdpActivo = false;
      
      if (data2.entradactaPdpValidate
        && data2.herramientasPdpValidate
        && data2.pdp) {
          console.log('datosPDP FULL');
        this.checkEstadoPdpActivo = true;
        this.planParaLaDireccionDeProyectos = false;
        this.planificacionParaLaGestionDelAlcance=true;

        if (
          data3.entradactaPgaValidate &&
          data3.herramientasPgaValidate &&
          data3.pga
        ) {
          console.log('datosPGA FULL');
          this.checkEstadoPgaActivo = true;
          this.planificacionParaLaGestionDelAlcance = false;

        }
      }
    }
  }




}
