import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EntradaPga } from 'src/app/domain/pga/EntradaPga';
import { Pga } from 'src/app/domain/pga/pga';
import { PgaServiceService } from 'src/app/service/PgaService/pga-service.service';

@Component({
  selector: 'app-entradaspga',
  templateUrl: './entradaspga.component.html',
  styleUrls: ['./entradaspga.component.css']
})
export class EntradaspgaComponent implements OnInit {

  public entradasPga !: EntradaPga;
  public entradasPgaTMP !: EntradaPga;
  public entradasPgaPREVIOS !: EntradaPga[];
  public pga !: Pga;

  public messages: string[] = [""];
  public cargaEnable: boolean = true;

  public estandares: boolean = true;
  public objetivocalidad: boolean = true;
  public ciclo: boolean = true;
  public enfoque: boolean = true;
  public activosprocesos: boolean = true;

  constructor(
    public router: Router,
    public spinnerService: NgxSpinnerService,
    public pgaServiceService: PgaServiceService

  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      console.log('cargando');
      this.spinnerService.hide();
      this.cargaEnable = false;
      this.buscarDatosPrevios();
      //this.buscarEntradaPda();
    }, 2000);
    this.entradasPga = new EntradaPga(0, "", "", "", "", "", 0, false, "");
    this.entradasPgaTMP = new EntradaPga(0, "", "", "", "", "", 0, false, "");
  }

  /**
   * ********************************************************************
   * Métodos nuevos para guardar actualizar y buscar los datos previos
   * ********************************************************************
   */
  async buscarDatosPrevios() {

    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);
    var Salida = {
      'identradapga': '',
      'estandares': '',
      'objetivocalidad': '',
      'ciclo': '',
      'enfoque': '',
      'activosprocesos': '',
      'estado': '',
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    await this.pgaServiceService.BuscarDatosDeEntradasDePGA(Salida).subscribe(
      data => {
        console.log(data);
        this.entradasPgaPREVIOS = data;
        this.mostrarDatosPrevios();
      },
      error => {
        console.error('ERROR:');
        console.log(error.error.message);
      }
    );

  }
  public mostrarDatosPrevios(): void {
    console.log('Datos Previos');
    this.entradasPga.identradapga = 1;
    for (let i = 0; i < this.entradasPgaPREVIOS.length; i++) {
      this.entradasPgaTMP.estandares = this.entradasPgaTMP.estandares + '\n' + this.entradasPgaPREVIOS[i].estandares + ' -> ' + this.entradasPgaPREVIOS[i].participa;
      this.entradasPgaTMP.objetivocalidad = this.entradasPgaTMP.objetivocalidad + '\n' + this.entradasPgaPREVIOS[i].objetivocalidad + ' -> ' + this.entradasPgaPREVIOS[i].participa;
      this.entradasPgaTMP.ciclo = this.entradasPgaTMP.ciclo + '\n' + this.entradasPgaPREVIOS[i].ciclo + ' -> ' + this.entradasPgaPREVIOS[i].participa;
      this.entradasPgaTMP.enfoque = this.entradasPgaTMP.enfoque + '\n' + this.entradasPgaPREVIOS[i].enfoque + ' -> ' + this.entradasPgaPREVIOS[i].participa;
      this.entradasPgaTMP.activosprocesos = this.entradasPgaTMP.activosprocesos + '\n' + this.entradasPgaPREVIOS[i].activosprocesos + ' -> ' + this.entradasPgaPREVIOS[i].participa;
      // console.log(this.entradasPgaPREVIOS[i]);
      this.entradasPgaTMP.identradapga = this.entradasPgaPREVIOS[i].identradapga;
    }
  }

  async guardarEntradasPdpNuevo() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);
    var Salida = {
      'identradapga': this.entradasPga.identradapga,
      'estandares': this.entradasPga.estandares,
      'objetivocalidad': this.entradasPga.objetivocalidad,
      'ciclo': this.entradasPga.ciclo,
      'enfoque': this.entradasPga.enfoque,
      'activosprocesos': this.entradasPga.activosprocesos,
      'estado': this.entradasPga.estado,

      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    await this.pgaServiceService.guardarEntradaDelpga(Salida).subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.error('ERROR:');
        console.log(error.error.message);


      }
    );

  }
  async updateEntradaPgaNuevo() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);
    var Salida = {
      'identradapga': this.entradasPga.identradapga,
      'estandares': this.entradasPga.estandares,
      'objetivocalidad': this.entradasPga.objetivocalidad,
      'ciclo': this.entradasPga.ciclo,
      'enfoque': this.entradasPga.enfoque,
      'activosprocesos': this.entradasPga.activosprocesos,
      'estado': this.entradasPga.estado,

      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };

    await this.pgaServiceService.xxx(Salida).subscribe(
      data => {
        console.log(data);

      },
      error => {
        console.error('ERROR:');
        console.log(error.error.message);


      }
    );

  }

  /**
   * ********************************************************************
   * ********************************************************************
   */
  buscarEntradaPda() {
    var id = localStorage.getItem("idPdp");
    var idproyecto = JSON.parse(localStorage.getItem('idproyecto') || '{}');
    if (id != null) {
      this.pgaServiceService.BuscarEntradasPGAPorIdDelProyecto(idproyecto).subscribe(
        data => {
          if (data != null) {
            this.entradasPga = data;
          }
        });

    }
  }

  public updateEntradaPga() {
    this.pgaServiceService.updateEntradasPga(this.entradasPga).subscribe(
      data => {
        this.entradasPga = data;
        window.alert('Actualizo entradas pga');
        window.location.reload();
      }
    );
  }

  // Metodo de guardado
  async guardarEntradasPdp() {
    // Se crea El pga primero, y se almacen, con el id PGA se puede guardar la entrada y posteriormente la herramienta
    console.log('async guardarEntradasPdp(){');

    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);
    console.log('public guardarEntradasPdp(): \n \n');
    console.log('this.pgaServiceService.savePgaPorIdProyecto(idProyecto).subscribe( \n \n');

    this.pgaServiceService.savePgaPorIdProyecto(idProyecto).subscribe(
      data => {
        // console.log('ID DE LA REUNION ES ->', data);
        console.log(data);
        var idpga = data.idga;
        localStorage.setItem("idPga", idpga);
        console.log('SE GRABA EL ID DEL idPdp; SE BUSCO CON BASE AL ID DEL PROYECTO');
        //console.log(idPdp);
        this.entradasPga.idpga = idpga;
        console.log('*** \n ', this.entradasPga);
        this.guardarEntradaPGA();


      }
    );

  }
  public async guardarEntradaPGA() {
    console.log('public async guardarEntradaPGA() {');
    console.log(this.entradasPga);


    await this.pgaServiceService.saveEntradasPga(this.entradasPga).subscribe(
      data => {
        // console.log('ID DE LA REUNION ES ->', data);
        console.log(data);
        window.alert('Entradas del Plan Para la Direccion del proyecto Han sido guardados');
        window.location.reload();
        //this.router.navigate(['/seguimiento-proyecto']);
      });
  }
  public estandaresM(): void {
    this.estandares = false;
  }

  public objetivocalidadM(): void {
    this.objetivocalidad = false;
  }

  public cicloM(): void {
    this.ciclo = false;
  }

  public enfoqueM(): void {
    this.enfoque = false;
  }

  public activosprocesosM(): void {
    this.activosprocesos = false;
  }



}
