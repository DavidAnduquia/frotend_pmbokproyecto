import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { EntradactaService } from 'src/app/service/Actas/entradacta.service';

@Component({
  selector: 'app-actas',
  templateUrl: './actas.component.html',
  styleUrls: ['./actas.component.css']
})
export class ActasComponent implements OnInit {


  public entrada: boolean = false;
  public caso: boolean = false;
  public plan: boolean = false;
  public herramienta: boolean = false;

  public entradaVista: boolean = false;
  public casoVista: boolean = false;
  public planVista: boolean = false;
  public herramientaVista: boolean = false;


  constructor(public entradaDeActaServices: EntradactaService) {  }

  ngOnInit(): void {
    // console.log('***ngOnInit ActasComponent');
    this.RevisarAvances();
    this.checkStatusEntrada(); // Este realmente cambia el estado 


  }

  public disableOpciones() {
    if (
      localStorage.getItem('idactas') == null &&
      localStorage.getItem('idreunion') == null &&
      localStorage.getItem('entradaActaId') == null
    ) {
      return true

    } else {
      return false;
    }


  }
  public entradaM(): void {
    // this.falseTotal();
    this.entradaVista = true;
  }
  public casoM(): void {
    //  this.falseTotal();
    this.casoVista = true;
  }
  public planM(): void {
    //  this.falseTotal();
    this.planVista = true;
  }
  public herramientaM(): void {
    // this.falseTotal();
    this.herramientaVista = true;
  }

  

  public checkStatusEntrada() {
    console.log('\n \n public checkStatusEntrada() {');
    var variable = JSON.parse(localStorage.getItem("datosActa") || '{}');
    
    if (variable) {
      console.log('condicional');
      
      this.entrada = variable.entradactaValidate;
      this.caso = variable.casoNegocioValidate;
      this.plan = variable.planValidate;
      this.herramienta = variable.herramientasValidate;
    }
  }



  public async RevisarAvances() {
    console.log('public async RevisarAvances(){    ');

    var datos = JSON.parse(localStorage.getItem('datosActa') || '{}');
    // Se valida si ya se ha grabado un acta 
    if (datos.acta) {
      // Se procede a revisar los datos del acta para activar o desactivar las entrada de datos
      // se buscar que si la Entrada del Acta, aun no se ha llenado, los demas componentes NO se puedes diligenciar 
      this.entrada = datos.entradactaValidate;
      this.caso = datos.casoNegocioValidate;
      this.plan = datos.planValidate;
      this.herramienta = datos.herramientasValidate;

      let x = localStorage.getItem("idproyecto");
      var idProyecto = Number(x);
      await this.entradaDeActaServices.validarActa(idProyecto).subscribe(
        data => {
          // console.log('ID DE LA REUNION ES ->', data);
          var idActa = data;
          localStorage.setItem("idactas", idActa); // console.log('SE GRABA EL ID DEL ACTA; SE BUSCO CON BASE AL ID DEL PROYECTO');

        },
      );

      if (datos.entradactaValidate) {
        //console.log('EXTRAER SI TIENE ENTRADA DEL ACTA YA FULL');

        this.entradaDeActaServices.valorIdEntraActa(idProyecto).subscribe(
          data => {
            //    console.log('ID DE LA ENTRADA DEL ACTA ES  ES ->', data);
           // window.alert("entro en datos.entradactaValidate ((DATA)) " + data);

            var idEntradaActa = data;
            localStorage.setItem("entradaActaId", idEntradaActa);
          },
          error => {
            console.error("Error en " + error);
          });
      }


    }

  }
}
