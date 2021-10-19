import { Component, OnInit } from '@angular/core';
import { CasoNegocio } from 'src/app/domain/casonegocio';
import { CasonegocioService } from 'src/app/service/Actas/casonegocio.service';
import { EntradactaService } from 'src/app/service/Actas/entradacta.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-caso-negocio',
  templateUrl: './caso-negocio.component.html',
  styleUrls: ['./caso-negocio.component.css']
})
export class CasoNegocioComponent implements OnInit {
  public casoMegocio !: CasoNegocio;
  public casoMegocioTMP !: CasoNegocio;
  public casoMegocioPrevios !: CasoNegocio[];

  public mensaje !: String;


  public metas: boolean = true;
  public objetivos: boolean = true;
  public incidentes: boolean = true;
  public oportunidades: boolean = true;

  public messages: string[] = [""];

  public cargaEnable: boolean = true;

  constructor(
    public router: Router,
    public casoServices: CasonegocioService,
    public entradactaService: EntradactaService,
    public spinnerService: NgxSpinnerService,
    public casoNegocioService: CasonegocioService

  ) {
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.cargaEnable = true;

    setTimeout(() => {
      console.log('cargando...');
      this.BuscarDatosPrevios();
      this.spinnerService.hide();
      this.cargaEnable = false;
      //this.buscarCasoDeNegocioPorEntrada();

    }, 2000);

    this.casoMegocio = new CasoNegocio(0, "", "", "", "", 0, false, "");
    this.casoMegocioTMP = new CasoNegocio(0, "", "", "", "", 0, false, "");

  }
  async BuscarDatosPrevios() {
    console.log('CARGANDO INFORMAICON PREVIA');
    
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);
    var Salida = {
      'identrada': 0,

      'metas': this.casoMegocio.metas,
      'objetivos': this.casoMegocio.objetivos,
      'incidentes': this.casoMegocio.incidentes,
      'oportunidades': this.casoMegocio.oportunidades,

      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };    
    await this.casoServices.BuscarDatosPrevios(Salida).subscribe(
      data => {
        //console.log(ok);
        this.casoMegocioPrevios = data;
        this.mostrarDatosPrevios();

      }, error => {
        console.log('ERROR DATOS PREVIOS: ', error);
        this.mensaje = error.error.message;

      }
    );
  }
  public mostrarDatosPrevios(): void {
    console.log('Datos Previos');
    this.casoMegocio.id_caso_negocio = 1;
    //this.entradaActa.identrada =1;
    for (let i = 0; i < this.casoMegocioPrevios.length; i++) {
      //this.entradaActa.factores.concat('\n', this.entradaActaPrevios[i].factores);
      this.casoMegocioTMP.metas = this.casoMegocioTMP.metas +'\n'+ this.casoMegocioPrevios[i].metas +' ->'+this.casoMegocioPrevios[i].participa;
      this.casoMegocioTMP.objetivos = this.casoMegocioTMP.objetivos +'\n'+ this.casoMegocioPrevios[i].objetivos +' ->'+this.casoMegocioPrevios[i].participa;
      //this.entradaActa.activosprocesos.concat('\n', this.entradaActaPrevios[i].activosprocesos);
      this.casoMegocioTMP.incidentes = this.casoMegocioTMP.incidentes+'\n' + this.casoMegocioPrevios[i].incidentes +' ->'+this.casoMegocioPrevios[i].participa;

      this.casoMegocioTMP.oportunidades = this.casoMegocioTMP.oportunidades+'\n' + this.casoMegocioPrevios[i].oportunidades +' ->'+this.casoMegocioPrevios[i].participa;

      console.log(this.casoMegocioPrevios[i]);
      this.casoMegocioTMP.id_caso_negocio =this.casoMegocioPrevios[i].id_caso_negocio;


    }
  }

  async guardarCasoNegocioNuevo() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    var Salida = {
      'identrada': 0,
      'metas': this.casoMegocio.metas,
      'objetivos': this.casoMegocio.objetivos,
      'incidentes': this.casoMegocio.incidentes,
      'oportunidades': this.casoMegocio.oportunidades,

      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    console.log(Salida);
    if (Salida.participa == undefined || Salida.participa == null || Salida.participa === "") {
      console.log("Error: No se encuentra Usuario");
      
    } else {
      await this.casoServices.guardarCasoNegocioNuevo(Salida).subscribe(
        ok => {
          console.log(ok);

        }, error => {
          console.log('ERROR: ', error.error.message);
          this.mensaje = error.error.message;

        }
      );

    }
    console.log('cargando...');
    setTimeout(() => {
      location.reload();    
    }, 2000);

  }
  async updateCasoNegocioNuevo() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    var Salida = {
      'identrada': 0,

      'metas': this.casoMegocio.metas,
      'objetivos': this.casoMegocio.objetivos,
      'incidentes': this.casoMegocio.incidentes,
      'oportunidades': this.casoMegocio.oportunidades,

      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    console.log(Salida);
    await this.casoServices.guardarCasoNegocioNuevo(Salida).subscribe(
      ok => {
        console.log(ok);


      }, error => {
        console.log('ERROR: ', error);
        this.mensaje = error.error.message;

      }
    );
    console.log('cargando...');
    setTimeout(() => {
      location.reload();    
    }, 2000);
  }


  public guardarCasoNegocio() {


    console.log(this.casoMegocio.oportunidades);
    let x = localStorage.getItem("entradaActaId");

    var idActa = Number(x);
    this.casoMegocio.idEntradaActa = idActa;
    var variable = JSON.parse(localStorage.getItem("datosActa") || '{}');

    this.casoServices.save(this.casoMegocio).subscribe(
      ok => {
        console.log('3');
        console.log(ok);
        //   window.alert("Nueva acta guardada ");

        var datosSacados = localStorage.getItem("datosActa") || {};
        //  window.alert("Nuevo Plan de Gestión se ha grabado  " +  datosSacados);
        variable.casoNegocioValidate = true;
        localStorage.setItem("datosActa", JSON.stringify(variable));

        window.location.reload();


      },
      err => {
        console.log(err.error.error);

        this.messages = err.error.error;
      }
    );
  }




  public buscarCasoDeNegocioPorEntrada() {

    console.log('->>>>>buscarCasoDeNegocioPorEntrada');
    var idproyecto = JSON.parse(localStorage.getItem('idproyecto') || '{}');
    console.log('->>>>>', idproyecto);


    this.casoNegocioService.findherramientaDelActa(idproyecto).subscribe(
      data => {

        if (data[0] != null) {
          this.casoMegocio = data[0];
          console.table(this.casoMegocio);
        }
      },

      err => {
        console.log(err.error.error);
        //window.alert(err.error.error);

      }
    );


  }


  public updateCasoNegocio() {
    this.casoNegocioService.update(this.casoMegocio).subscribe(
      data => {
        this.casoMegocio = data;
        window.alert("actualizo el caso de negocio");
        window.location.reload();
      }, err => {
        console.log(err.error.error);
      }
    )
  }



  public guardarmetas() {
    console.log('guardarmetas');
    this.metas = false;
  }
  public guardarobjetivos() {
    console.log('guardarobjetivos');
    this.objetivos = false;
  }
  public guardarincidentes() {
    console.log('guardarincidentes');
    this.incidentes = false;
  }
  public guardaroportunidades() {
    console.log('guardaroportunidades');
    this.oportunidades = false;
  }

}
