import { Component, OnInit } from '@angular/core';
import { PdpServicesService } from 'src/app/service/PdpService/pdp-services.service';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.css']
})
export class PdpComponent implements OnInit {

  // Variables para iconos 
  public pdp: boolean = false;
  public entrada: boolean = false;
  public herramienta: boolean = false;
  // Variables para permitir las vistas
  public entradaVista: boolean = false;
  public herramientaVista: boolean = false;
  constructor(
    public pdpServicesService:PdpServicesService
  ) { }

  ngOnInit(): void {
    this.checkStatusPDP();
    this.validarPDP();
   }

  public RevisarAvances() {
    console.log('public async RevisarAvances() {');
    var datos = JSON.parse(localStorage.getItem('datosPDP') || '{}');
    if (datos) {
      if (
        datos.entradactaPdpValidate &&
        datos.herramientasPdpValidate &&
        datos.pdp
      ) {
        console.log('TODO FULL NO HAY MAS DATOS PERMITIDOS');
        this.entradaVista = datos.entradactaPdpValidate;
        this.herramientaVista = datos.herramientasPdpValidate;
      }





    }

  }

  public checkEstadoPDP() {

    //this.validarPDP();

    var data = JSON.parse(localStorage.getItem('datosPDP') || '{}');
      // &&  data.herramientasPdpValidate == true 
    if (data.pdp == true &&   data.entradactaPdpValidate == true ) {
        this.entrada=true;
    } else if(data.pdp == true && data.herramientasPdpValidate == true){
      this.herramienta=true;
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


  public checkStatusPDP() {
    console.log('\n \n public checkStatusEntrada() {');

    var variable = JSON.parse(localStorage.getItem("datosPDP") || '{}');

    if (variable) {
      console.log('condicional');
      this.pdp = variable.pdp;
      this.entrada = variable.entradactaPdpValidate;
      this.herramienta = variable.herramientasPdpValidate;

      window.alert("entra en pdp" + this.herramienta);
    }  
  }

}
