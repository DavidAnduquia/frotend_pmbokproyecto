import { Component, OnInit } from '@angular/core';
import { PlanGestioBeneficio } from 'src/app/domain/plangestionbeneficio';
import { Router } from '@angular/router';
import { EntradactaService } from 'src/app/service/Actas/entradacta.service';
import { PlangestionbeneficioService } from 'src/app/service/Actas/plangestionbeneficio.service';

import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-plan-gestion-beneficios',
  templateUrl: './plan-gestion-beneficios.component.html',
  styleUrls: ['./plan-gestion-beneficios.component.css']
})
export class PlanGestionBeneficiosComponent implements OnInit {
  public planObje !: PlanGestioBeneficio;
  public planObjePrevio !: PlanGestioBeneficio;
  public planObjeTMP !: PlanGestioBeneficio[];


  public acciones: boolean = true;
  public componentes: boolean = true;
  public prodcutos: boolean = true;
  public servicios: boolean = true;
  public resultado: boolean = true;
  public messages: string[] = [""];

  public cargaEnable: boolean = true;


  constructor(
    public router: Router,
    public planesService: PlangestionbeneficioService,
    public entradactaService: EntradactaService,
    public spinnerService: NgxSpinnerService,
    public planService: PlangestionbeneficioService

  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.cargaEnable = true;
    setTimeout(() => {
      console.log('cargando');
      this.spinnerService.hide();
      this.cargaEnable = false;
      this.buscarherramientasPorActa();

    }, 2000);

    this.planObje = new PlanGestioBeneficio(0, 0, "", "", "", "", "", false, "");
    this.planObjePrevio = new PlanGestioBeneficio(0, 0, '', '', '', '', '', true, '');

  }


  public guardarPlanDeBeneficiosNuevo() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    var Salida = {

      'identrada': 0,
      'acciones':this.planObje.acciones,
      'componentes': this.planObje.componentes,
      'prodcutos': this.planObje.prodcutos,
      'servicios': this.planObje.servicios,
      'resultado': this.planObje.resultado,
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    console.log(Salida);

    this.planService.guardarPlanDeBeneficiosNuevo(Salida).subscribe(
      ok => {
        console.log(ok);

      },
      error => {
        console.log(error.error.message);


      }
    );
    console.log('cargando...');
    setTimeout(() => {
      //location.reload();    
    }, 2000);


  }
  public updatePlanNuevo() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    var Salida = {

      'identrada': 0,
      'id_plan_gb': 0, // IMPORTENTE ORGANIZAR ESTE ID PARA LAS ACTUALIZACIONES POR PARTE DEL ADMIN
      'acciones':this.planObje.acciones,
      'componentes': this.planObje.componentes,
      'prodcutos': this.planObje.prodcutos,
      'servicios': this.planObje.servicios,
      'resultado': this.planObje.resultado,
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    console.log(Salida);

    this.planService.guardarPlanDeBeneficiosNuevo(Salida).subscribe(
      ok => {
        console.log(ok);

      },
      error => {
        console.log(error.error.message);


      }
    );
    console.log('cargando...');
    setTimeout(() => {
      //location.reload();    
    }, 2000);

  }
  public guardarPlan() {
    console.log(this.planObje.acciones);
    console.log(this.planObje.componentes);
    console.log(this.planObje.prodcutos);
    console.log(this.planObje.servicios);
    console.log(this.planObje.resultado);
    var variable = JSON.parse(localStorage.getItem("datosActa") || '{}');

    let x = localStorage.getItem("entradaActaId");
    var idActa = Number(x);
    this.planObje.idEntradaActa = idActa;
    if (this.planObje.idEntradaActa != 0) {
      console.log(this.planObje);
      this.planesService.save(this.planObje).subscribe(
        ok => {

          console.table(ok);
          var datosSacados = localStorage.getItem("datosActa") || {};
          //window.alert("Nuevo Plan de Gestión se ha grabado  " +  datosSacados);

          variable.planValidate = true;
          localStorage.setItem("datosActa", JSON.stringify(variable));

          window.location.reload();

        },
        err => {
          console.log(err.error.error);

          this.messages = err.error.error;
        }
      );
    } else {
      window.alert('error en el identificador de las entradas');
    }


  }


  //método para buscar la información previa 22/09/2021 Miercoles
  async buscarherramientasPorActa() {

    
    //console.log('->>>>>',idproyecto);
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    var data = {
      "identrada": 0,
      "id_plan_gb": 0,
      "acciones": "",
      "componentes": "",
      "prodcutos": "",
      "servicios": "",
      "resultado": "",
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

  };
    await this.planService.BuscarDatosDePlanBeneficiosPrevias(data).subscribe(
      data => {
        //console.log('->>>>> buscarherramientasPorActa');
        console.log(data);
        if (data[0] != null) {
          this.planObjeTMP = data;
          // console.table(this.planObje);
          this.mostrarDatosPrevios();
        }
      },

      err => {
        console.log(err.error.message);
        // window.alert('Plan gestion Beneficios ' + err.error.message);

      }
    );
  }
  public mostrarDatosPrevios(): void {
    // planObje !: PlanGestioBeneficio; ORIGINAL
    // planObjePrevio !: PlanGestioBeneficio; PREVIOS 
    // planObjeTMP !: PlanGestioBeneficio[]; LIST TMP
    console.log('Datos Previos');
    this.planObjePrevio.id_plan_gb = 1;
    //this.entradaActa.identrada =1;
    for (let i = 0; i < this.planObjeTMP.length; i++) {
    
      this.planObjePrevio.acciones = this.planObjePrevio.acciones +'\n'+ this.planObjeTMP[i].acciones +' ->'+this.planObjeTMP[i].participa;
      this.planObjePrevio.componentes = this.planObjePrevio.componentes +'\n'+ this.planObjeTMP[i].componentes +' ->'+this.planObjeTMP[i].participa;
    
      this.planObjePrevio.prodcutos = this.planObjePrevio.prodcutos+'\n' + this.planObjeTMP[i].prodcutos +' ->'+this.planObjeTMP[i].participa;

      this.planObjePrevio.servicios = this.planObjePrevio.servicios+'\n' + this.planObjeTMP[i].servicios +' ->'+this.planObjeTMP[i].participa;
      this.planObjePrevio.resultado = this.planObjePrevio.resultado+'\n' + this.planObjeTMP[i].resultado +' ->'+this.planObjeTMP[i].participa;
      console.log(this.planObjeTMP[i]);
      this.planObjePrevio.id_plan_gb =this.planObjeTMP[i].id_plan_gb;


    }
  }

  public updatePlan() {
    this.planService.update(this.planObje).subscribe(
      data => {
        console.log('data ->>>', data);
        this.planObje = data;
        window.alert('Plan gestion Beneficios actualizada');
        window.location.reload();

      }, err => {
        console.log(err.error.error);
      });
  }

  public guardaracciones() {
    console.log('GUARDARacciones');
    this.acciones = false;

  }
  public guardarcomponentes() {
    console.log('comGUARDARponentes');
    this.componentes = false;

  }
  public guardarprodcutos() {
    console.log('pGUARDARrodcutos');
    this.prodcutos = false;

  }
  public guardarservicios() {
    console.log('sGUARDARervicios');
    this.servicios = false;

  }
  public guardarresultado() {
    console.log('rGUARDAResultado');
    this.resultado = false;

  }

}
