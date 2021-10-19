import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Herramientas } from 'src/app/domain/pdp/herramientas';
import { NgxSpinnerService } from 'ngx-spinner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PdpServicesService } from 'src/app/service/PdpService/pdp-services.service';

@Component({
  selector: 'app-heramientas-pdp',
  templateUrl: './heramientas-pdp.component.html',
  styleUrls: ['./heramientas-pdp.component.css']
})
export class HeramientasPdpComponent implements OnInit {

  public herramientasPdp !: Herramientas;
  public herramientasPdpTMP !: Herramientas;
  public herramientasPdpPREVIOS !: Herramientas[];

  // variables de llenar 


  public juicioexpertos: boolean = true;
  public recopilaciondatos: boolean = true;
  public habilidades: boolean = true;
  public herramientareuniones: boolean = true;


  public messages: string[] = [""];
  public cargaEnable: boolean = true;

  constructor(public router: Router,
    public spinnerService: NgxSpinnerService,
    public servicesPdp: PdpServicesService) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.cargaEnable = true;
    setTimeout(() => {
      console.log('cargando');
      this.spinnerService.hide();
      this.cargaEnable = false;
      this.datosHerramientasPrevios();
      //this.buscarHerramientasPdp();
    }, 2000);
    this.herramientasPdp = new Herramientas(0, "", "", "", "", 0, false, "");
    this.herramientasPdpTMP = new Herramientas(0, "", "", "", "", 0, false, "");


  }
  /*******************
   * MÉTODOS PARA GUARDAR ACTUALIZAR Y REVISAR PREVIOS 28/9/2021
   * 
   * ********************** */

  async datosHerramientasPrevios() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);
    var Salida = {
      'juicioexpertos': this.herramientasPdp.juicioexpertos,
      'recopilaciondatos': this.herramientasPdp.recopilaciondatos,
      'habilidades': this.herramientasPdp.habilidades,
      'herramientareuniones': this.herramientasPdp.herramientareuniones,
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    await this.servicesPdp.datosPreviosHerramientaPdp(Salida).subscribe(
      data => {
        console.log(data);
        this.herramientasPdpPREVIOS = data;
        this.mostrarDatosPrevios();

      },
      error => {
        console.error('ERROR:');
        console.error(error.error.message);

      }
    );

  }
  public mostrarDatosPrevios(): void {
    console.log('Datos Previos');
    this.herramientasPdp.idherramienta = 1;
    for (let i = 0; i < this.herramientasPdpPREVIOS.length; i++) {
      this.herramientasPdpTMP.habilidades = this.herramientasPdpTMP.habilidades + '\n' + this.herramientasPdpPREVIOS[i].habilidades + ' -> ' + this.herramientasPdpPREVIOS[i].participa;
      this.herramientasPdpTMP.herramientareuniones = this.herramientasPdpTMP.herramientareuniones + '\n' + this.herramientasPdpPREVIOS[i].herramientareuniones + ' -> ' + this.herramientasPdpPREVIOS[i].participa;
      this.herramientasPdpTMP.juicioexpertos = this.herramientasPdpTMP.juicioexpertos + '\n' + this.herramientasPdpPREVIOS[i].juicioexpertos + ' -> ' + this.herramientasPdpPREVIOS[i].participa;
      this.herramientasPdpTMP.recopilaciondatos = this.herramientasPdpTMP.recopilaciondatos + '\n' + this.herramientasPdpPREVIOS[i].recopilaciondatos + ' -> ' + this.herramientasPdpPREVIOS[i].participa;
      // console.log(this.herramientasPdpPREVIOS[i]);
      this.herramientasPdpTMP.idherramienta = this.herramientasPdpPREVIOS[i].idherramienta;
      

    }

  }
  async guardarHerramientasPdpNUEVO() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);
    var Salida = {
      'juicioexpertos': this.herramientasPdp.juicioexpertos,
      'recopilaciondatos': this.herramientasPdp.recopilaciondatos,
      'habilidades': this.herramientasPdp.habilidades,
      'herramientareuniones': this.herramientasPdp.herramientareuniones,
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    console.log(Salida);

    await this.servicesPdp.guardarHerramientaDelPDP(Salida).subscribe(
      ok => {
        console.log(ok);

      },
      error => {
        console.error('ERROR:');
        console.error(error.error.message);

      }
    );

  }
  async updateHerramientaPdpNUEVO() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);
    var Salida = {
      'juicioexpertos': this.herramientasPdp.juicioexpertos,
      'recopilaciondatos': this.herramientasPdp.recopilaciondatos,
      'habilidades': this.herramientasPdp.habilidades,
      'herramientareuniones': this.herramientasPdp.herramientareuniones,
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    await this.servicesPdp.actualiazrHerramientaDelPDP(Salida).subscribe(
      ok => {
        console.log(ok);

      },
      error => {
        console.error('ERROR:');
        console.error(error.error.message);

      }
    );

  }




  /***************************************** */
  public async revisarIdpdp() {
    let x = localStorage.getItem("idPdp");
    var idPdp = Number(x);

    if (idPdp) {

    } else {
      // No se encontro el ID PDP 
      // sI NO EXISTE EL IP PDP NO SE GRABARÁ LA HERRAMIENT DEL PDP
      let x = localStorage.getItem("idproyecto");
      var idproyecto = Number(x);
      await this.servicesPdp.BuscarHerramientasPdpPorIdDelProyecto(idproyecto).subscribe(
        data => {
          console.log(data.idpdp);
          localStorage.setItem('idPdp', data.idpdp);

        }
      );
    }

  }

  buscarHerramientasPdp() {
    var id = localStorage.getItem("idPdp");
    var idproyecto = JSON.parse(localStorage.getItem('idproyecto') || '{}');
    if (id != null) {
      this.servicesPdp.BuscarHerramientasPdpPorIdDelProyecto(idproyecto).subscribe(
        data => {
          if (data != null) {
            this.herramientasPdp = data;
          }
        });

    }
  }



  public updateHerramientaPdp() {
    this.servicesPdp.updateHerramientasPdp(this.herramientasPdp).subscribe(
      data => {
        this.herramientasPdp = data;
      }
    );
  }

  public async guardarHerramientasPdp() {
    console.log('public guardarHerramientasPdp() {');
    this.revisarIdpdp();
    var updateDataPDP = JSON.parse(localStorage.getItem("datosPDP") || '{}');

    let x = localStorage.getItem("idPdp");
    var idpdp = Number(x);
    this.herramientasPdp.idpdp = idpdp;
    await this.servicesPdp.saveHerramientasPdp(this.herramientasPdp).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('idPdp', data.idpdp);

        updateDataPDP.herramientasPdpValidate = true;
        localStorage.setItem("datosPDP", JSON.stringify(updateDataPDP));
        window.location.reload();
        //  this.router.navigate(['/seguimiento-proyecto']);
      }
    );

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
