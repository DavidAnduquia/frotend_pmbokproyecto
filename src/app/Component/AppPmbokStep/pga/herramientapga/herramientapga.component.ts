import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PgaHerramientas } from 'src/app/domain/pga/PgaHerramientas';
import { PgaServiceService } from 'src/app/service/PgaService/pga-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-herramientapga',
  templateUrl: './herramientapga.component.html',
  styleUrls: ['./herramientapga.component.css']
})
export class HerramientapgaComponent implements OnInit {

  public herramientasPGA  !: PgaHerramientas;
  public herramientasPGATMP  !: PgaHerramientas;
  public herramientasPGAprevios  !: PgaHerramientas[];

  public idherramientapga: boolean = true;
  public juicioexpertos: boolean = true;
  public analisis: boolean = true;

  public messages: string[] = [""];

  public cargaEnable: boolean = true;
  constructor(
    public router: Router,
    public pgaService: PgaServiceService,
    public spinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.spinnerService.show();
    this.cargaEnable = true;
    setTimeout(() => {
      console.log('cargando');
      this.spinnerService.hide();
      this.cargaEnable = false;
      this.datosHerramientasPGAPrevios();
      // this.buscarHerramientasPda();
    }, 2000);
    this.herramientasPGA = new PgaHerramientas(0, "", "", 0, false, "");
    this.herramientasPGATMP = new PgaHerramientas(0, "", "", 0, false, "");
  }


  /*******************
   * MÉTODOS PARA GUARDAR ACTUALIZAR Y REVISAR PREVIOS 28/9/2021
   * 
   * ********************** */

  async datosHerramientasPGAPrevios() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);
    var Salida = {
      'idherramientapga': '',
      'juicioexpertos': '',
      'analisis': '',
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    await this.pgaService.BuscarDatosDeHerrmientaDePGA(Salida).subscribe(
      data => {
        console.log(data);
        this.herramientasPGAprevios = data;
        this.mostrarDatosPrevios();

      },
      error => {
        console.error('ERROR:');
        console.error(error.error.message);

      }
    );

  }
  mostrarDatosPrevios() {
    console.log('Datos previos');
    this.herramientasPGA.idherramientapga = 1;
    for (let i = 0; i < this.herramientasPGAprevios.length; i++) {
      this.herramientasPGATMP.juicioexpertos = this.herramientasPGATMP.juicioexpertos + '\n' + this.herramientasPGAprevios[i].juicioexpertos + ' -> ' + this.herramientasPGAprevios[i].participa;
      this.herramientasPGATMP.analisis = this.herramientasPGATMP.analisis + '\n' + this.herramientasPGAprevios[i].analisis + ' -> ' + this.herramientasPGAprevios[i].participa;
      // console.log(this.herramientasPGAprevios[i]);
      this.herramientasPGA.idherramientapga = this.herramientasPGAprevios[i].idherramientapga;
    }



  }
  async guardarHerramientasPgaNuevo() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    var Salida = {
      'idherramientapga': this.herramientasPGA.idherramientapga,
      'juicioexpertos': this.herramientasPGA.juicioexpertos,
      'analisis': this.herramientasPGA.analisis,
      'idpdp': this.herramientasPGA.idpdp,
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    await this.pgaService.guardarHerramientaDelpga(Salida).subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.error('ERROR');
        console.log(error.error.message);


      }
    );

  }
  async updateHerramientaPgaNuevo() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    var Salida = {
      'idherramientapga': this.herramientasPGA.idherramientapga,
      'juicioexpertos': this.herramientasPGA.juicioexpertos,
      'analisis': this.herramientasPGA.analisis,
      'idpdp': this.herramientasPGA.idpdp,
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    await this.pgaService.xxx(Salida).subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.error('ERROR');
        console.log(error.error.message);


      }
    );

  }


  /*******************
   * ************************************************
   * ************************************************
   * ********************** */

  buscarHerramientasPda() {
    var id = localStorage.getItem("idPdp");
    var idproyecto = JSON.parse(localStorage.getItem('idproyecto') || '{}');
    if (id != null) {
      this.pgaService.BuscarHerramientasPGAPorIdDelProyecto(idproyecto).subscribe(
        data => {
          if (data != null) {
            this.herramientasPGA = data;
          }
        });

    }
  }


  public updateHerramientaPga() {
    this.pgaService.updateHerramientasPga(this.herramientasPGA).subscribe(
      data => {
        this.herramientasPGA = data;
        window.alert('Actualizo entradas pga');
        window.location.reload();
      }
    );
  }

  /*
  public guardarHerramientas() {
    console.log(this.herramientasPGA.idherramientapga);
    console.log(this.herramientasPGA.juicioexpertos);
    console.log(this.herramientasPGA.analisis);
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


  }*/

  public juicioexpertosM(): void {
    this.juicioexpertos = false;
  }
  public analisisM(): void {
    this.analisis = false;
  }

  public guardarHerramientasPga() {
    console.log('public guardarHerramientasPga(){');
    let x = localStorage.getItem("idPga");
    var idPga = Number(x);
    if (idPga) {
      console.log('si tiene ');
      this.herramientasPGA.idpdp = idPga;
      console.log(this.herramientasPGA);
      this.guardarHerramientas();



    } else {
      console.log('NO tiene ');

    }
  }

  public async guardarHerramientas() {
    console.log('\n public async guardarHerramientas(){');

    await this.pgaService.saveHerramientasPga(this.herramientasPGA).subscribe(
      data => {
        console.log('GRabando data de Herramientas PGA');
        console.log(data);
        window.location.reload();

        //this.router.navigate(['/seguimiento-proyecto']);

      }
    );

  }

}
