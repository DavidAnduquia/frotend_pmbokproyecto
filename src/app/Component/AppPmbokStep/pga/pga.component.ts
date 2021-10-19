import { Component, OnInit } from '@angular/core';
import { PgaServiceService } from 'src/app/service/PgaService/pga-service.service';

@Component({
  selector: 'app-pga',
  templateUrl: './pga.component.html',
  styleUrls: ['./pga.component.css']
})
export class PgaComponent implements OnInit {

  public pga: boolean = false;
  public entrada: boolean = false;
  public herramienta: boolean = false;

  public entradaVista: boolean = false;
  public herramientaVista: boolean = false;

  constructor(
    public pgaServiceService: PgaServiceService
  ) {

    //idherramientapga
	
    //juicioexpertos 
    //analisis 
    //idpga
    
      //estado
      //participa 
    //idfase
    //idproyecto
   }

  ngOnInit(): void {
  //  this.checkStatusEntrada();
  //  this.checkStatusHerramienta();
 // this.checkEstadoPGA();
    this.validarPGA();
  }

  public async checkStatusEntrada(){
    var datos = JSON.parse(localStorage.getItem('datosPGA') || '{}');
    if(datos.entradactaPgaValidate && datos.pga){
      this.pga = true;
      this.entrada = true;
    }
  }


  public checkEstadoPGA() {

    //this.validarPDP();

    var data = JSON.parse(localStorage.getItem('datosPGA') || '{}');
      // &&  data.herramientasPdpValidate == true 
    if (data.pga == true  && data.entradactaPgaValidate == true ) {
        this.entrada=true;

    } 
    
    if(data.herramientasPgaValidate == true){
      this.herramienta=true;
     }
  }


  public async checkStatusHerramienta() {
    console.log('PGA COMPONENTES');
    console.log(',\n public async RevisarAvances() {');
    var datos = JSON.parse(localStorage.getItem('datosPGA') || '{}');
   
    if (datos.herramientasPgaValidate && datos.pga){
      this.pga = true;
      this.herramienta = true;
    
    } else {
      console.log('Nada es true');
      //this.entradaVista = true;
     // this.herramientaVista = true;
    }
  }

  async validarPGA() {
    console.log('----------  validarPGA() {()');
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


  public async buscarIdPga() {
    console.log('public async buscarIdPga(){');
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);
    await this.pgaServiceService.findIdPgaForIdProyecto(idProyecto).subscribe(
      data => {
        console.log(data);
        console.log();
        localStorage.setItem('idPga', data.idga);
       }, err => {
        window.alert('Plan gestion Beneficios ' + err.error.error);
      }
    );


  }


  public entradaM(): void {
    this.entradaVista = true;
  }
  public herramientaM(): void {
    this.herramientaVista = true;
  }
  public falseTotal(): void {
    this.herramientaVista = true;
    this.entradaVista = true;
  }



}
