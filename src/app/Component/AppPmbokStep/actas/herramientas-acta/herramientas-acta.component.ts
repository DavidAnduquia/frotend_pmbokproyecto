import { Component, OnInit } from '@angular/core';
import { HerramientasActa } from 'src/app/domain/herramientasactas';
import { EntradactaService } from 'src/app/service/Actas/entradacta.service';
import { HerramientasactaService } from 'src/app/service/Actas/herramientasacta.service';

import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-herramientas-acta',
  templateUrl: './herramientas-acta.component.html',
  styleUrls: ['./herramientas-acta.component.css']
})
export class HerramientasActaComponent implements OnInit {
  public herramientasObje !: HerramientasActa;
  public herramientasObjePrevio !: HerramientasActa;
  public herramientasObjeTMP !: HerramientasActa[];

  public juicioexpertos: boolean = true;
  public recopilaciondatos: boolean = true;
  public habilidades: boolean = true;
  public herramientareuniones: boolean = true;

  public messages: string[] = [""];

  public cargaEnable: boolean = true;

  constructor(
    public router: Router,
    public herrmientasServices: HerramientasactaService,
    // public entradactaService: EntradactaService,
    public spinnerService: NgxSpinnerService,
    public herramientasService: HerramientasactaService


  ) { }

  ngOnInit(): void {
    this.BuscarDatosPrevios();
    this.herramientasObje = new HerramientasActa(0, "", "", "", "", 0, false, "");
    this.herramientasObjePrevio = new HerramientasActa(0, "", "", "", "", 0, false, "");
    this.spinnerService.show();
    this.cargaEnable = true;
    setTimeout(() => {
      console.log('cargando');
      this.spinnerService.hide();
      this.cargaEnable = false;
      //this.buscarherramientasPorActa();

    }, 1300);

    // this.herramientasObje = new HerramientasActa(0, "", "", "", "", 0, false, "");
  }

  public actualizarHerramientasNuevo() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');

    var Salida = {
      'juicioexpertos': this.herramientasObje.juicioexpertos,
      'recopilaciondatos': this.herramientasObje.recopilaciondatos,
      'habilidades': this.herramientasObje.habilidades,
      'herramientareuniones': this.herramientasObje.herramientareuniones,

      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")
    };

    console.log(Salida);

    this.herramientasService.actualiazrHerramientasDelActa(Salida).subscribe(
      ok => {
        console.log(ok);
      }, error => {
        console.log(error.error.message);
      }
    );

    location.reload();

  }
  async BuscarDatosPrevios() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);
    var Salida = {
      'juicioexpertos':'',
      'recopilaciondatos':'',
      'habilidades': '',
      'herramientareuniones': '',

      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    await this.herrmientasServices.BuscarDatosDeHerramietasPrevias(Salida).subscribe(
      data => {
        console.log('************************');

        this.herramientasObjeTMP = data;
        //console.log(this.entradaActaPrevios);
        this.mostrarDatosPrevios();
        console.log('************************');
      },
      error => {
        console.log('ERROR:');
        console.log(error.error.message);
      }
    );
  }
  public mostrarDatosPrevios(): void {
    console.log('Datos Previos');
    this.herramientasObje.idherramienta =1;
    for (let i = 0; i < this.herramientasObjeTMP.length; i++) {
      // console.log(this.entradaActaPrevios[i]);
      //this.entradaActa.acuerdos.concat('\n', this.entradaActaPrevios[i].acuerdos);
      this.herramientasObjePrevio.juicioexpertos = this.herramientasObjePrevio.juicioexpertos +'\n'+ this.herramientasObjeTMP[i].juicioexpertos+' ->' +  this.herramientasObjeTMP[i].participa;
      //this.entradaActa.factores.concat('\n', this.entradaActaPrevios[i].factores);
      this.herramientasObjePrevio.recopilaciondatos = this.herramientasObjePrevio.recopilaciondatos +'\n'+ this.herramientasObjeTMP[i].recopilaciondatos+ ' ->' + this.herramientasObjeTMP[i].participa;
      //this.entradaActa.activosprocesos.concat('\n', this.entradaActaPrevios[i].activosprocesos);
      this.herramientasObjePrevio.habilidades = this.herramientasObjePrevio.habilidades +'\n'+  this.herramientasObjeTMP[i].habilidades + ' ->' + this.herramientasObjeTMP[i].participa;

      this.herramientasObjePrevio.herramientareuniones = this.herramientasObjePrevio.herramientareuniones +'\n'+  this.herramientasObjeTMP[i].herramientareuniones + ' ->' + this.herramientasObjeTMP[i].participa;
      
      console.log(this.herramientasObjeTMP[i]);
      this.herramientasObjePrevio.idherramienta =this.herramientasObjeTMP[i].idherramienta;


    }
  }
  public guardarHerramientasNuevo() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');

    var Salida = {
      'juicioexpertos': this.herramientasObje.juicioexpertos,
      'recopilaciondatos': this.herramientasObje.recopilaciondatos,
      'habilidades': this.herramientasObje.habilidades,
      'herramientareuniones': this.herramientasObje.herramientareuniones,

      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")
    };

    console.log(Salida);

    this.herramientasService.guardarHerramientasNuevo(Salida).subscribe(
      ok => {
        console.log(ok);
      }, error => {
        console.log(error.error.message);
      }
    );

    //location.reload();
  }

  public guardarHerramientas() {
    console.log(this.herramientasObje.juicioexpertos);
    console.log(this.herramientasObje.recopilaciondatos);
    console.log(this.herramientasObje.habilidades);
    console.log(this.herramientasObje.herramientareuniones);
    let x = localStorage.getItem("idactas");
    var idActa = Number(x);
    this.herramientasObje.idactas = idActa;
    var variable = JSON.parse(localStorage.getItem("datosActa") || '{}');

    if (idActa > 0) {
      this.herrmientasServices.save(this.herramientasObje).subscribe(
        ok => {
          variable.herramientasValidate = true;
          localStorage.setItem("datosActa", JSON.stringify(variable));
          window.alert("Nueva Herramientas del acta guardado  ");
          window.location.reload();

        },
        err => {
          console.log(err.error.error);

          this.messages = err.error.error;
        }
      );
    } else {
      window.alert('error en el identificador del ACTA');
    }


  }


  public buscarherramientasPorActa() {

    console.log('->>>>> buscarherramientasPorActa');
    var idproyecto = JSON.parse(localStorage.getItem('idproyecto') || '{}');
    console.log('->>>>>', idproyecto);
    this.herramientasService.findherramientaDelActa(idproyecto).subscribe(
      data => {
        console.log(data);
        if (data[0] != null) {
          this.herramientasObje = data[0];
        }
      },

      err => {
        console.log('ErrorbuscarherramientasPorActa:\n' + err.error.error);
        //window.alert('Herramientas ' + err.error.error);

      }
    );
  }


  public updateHerramienta() {
    this.herramientasService.update(this.herramientasObje).subscribe(
      data => {
        console.log('data ->>>', data);
        this.herramientasObje = data;
        window.alert("actualizo entradas del acta");
        window.location.reload();

      }, err => {
        console.log(err.error.error);
      });
  }

  public guardarjuicioexpertos() {
    console.log('juicioexpertos');
    this.juicioexpertos = false;
  }
  public guardarrecopilaciondatos() {
    console.log('recopilaciondatos');
    this.recopilaciondatos = false;
  }
  public guardarhabilidades() {
    console.log('habilidades');
    this.habilidades = false;
  }
  public guardarherramientareuniones() {
    console.log('herramientareuniones');
    this.herramientareuniones = false;
  }
}
