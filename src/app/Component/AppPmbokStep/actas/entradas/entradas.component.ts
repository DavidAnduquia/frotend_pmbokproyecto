import { Component, OnInit } from '@angular/core';
import { EntradactaService } from 'src/app/service/Actas/entradacta.service';
import { ReunionService } from 'src/app/service/Proyecto/reunion.service';
import { EntradaActa } from 'src/app/domain/entradacta';
import { Reunion } from 'src/app/domain/reunion';
import { Actas } from 'src/app/domain/actas';
import { Router } from '@angular/router';
import { ActasService } from 'src/app/service/actas.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DialogComponent } from 'src/app/Component/AppDialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})

export class EntradasComponent implements OnInit {

  public entradaActa!: EntradaActa;
  public entradaActaTMP!: EntradaActa;
  public entradaActaPrevios!: EntradaActa[];
  public reunion !: Reunion;
  public acta !: Actas;

  public nombreReunion !: string;
  public descripcion !: string;
  public acuerdosEnable: boolean = true;
  public factoresEnable: boolean = true;
  public activosEnable: boolean = true;
  public messages: string[] = [""];

  public cargaEnable: boolean = true;
  // **************************************************
  constructor(
    public router: Router,
    public entradactaService: EntradactaService,
    public reunionService: ReunionService,
    public actaService: ActasService,
    public spinnerService: NgxSpinnerService,
    public entradaService: EntradactaService,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.cargaEnable = true;
    setTimeout(() => {
      // console.log('cargando');
      this.BuscarDatosPrevios();
      this.spinnerService.hide();
      this.cargaEnable = false;

      //  window.alert(this.entradaActa.identrada);
      this.buscarEntradaPorActa();



    }, 1200);

    this.entradaActa = new EntradaActa(0, 0, "", "", "", false, "");
    this.entradaActaTMP = new EntradaActa(0, 0, "", "", "", false, "");


  }
  async BuscarDatosPrevios() {
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);
    var Salida = {
      'activosprocesos': '',
      'acuerdos': '',
      'estado': '',
      'factores': '',
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    await this.entradactaService.BuscarDatosDeEntradas(Salida).subscribe(
      data => {
        console.log('************************');

        this.entradaActaPrevios = data;
        //console.log(this.entradaActaPrevios);
        this.mostrarDatosPrevios();
        console.log('************************');
      },
      error => {
        console.log('ERROR:');
        console.error(error.error.message);
      }
    );
  }
  public mostrarDatosPrevios(): void {
    console.log('Datos Previos');
    this.entradaActa.identrada =1;
    for (let i = 0; i < this.entradaActaPrevios.length; i++) {
      // console.log(this.entradaActaPrevios[i]);
      //this.entradaActa.acuerdos.concat('\n', this.entradaActaPrevios[i].acuerdos);
      this.entradaActaTMP.acuerdos = this.entradaActaTMP.acuerdos +'\n'+ this.entradaActaPrevios[i].acuerdos+' ->' +  this.entradaActaPrevios[i].participa;
      //this.entradaActa.factores.concat('\n', this.entradaActaPrevios[i].factores);
      this.entradaActaTMP.factores = this.entradaActaTMP.factores +'\n'+ this.entradaActaPrevios[i].factores+ ' ->' + this.entradaActaPrevios[i].participa;
      //this.entradaActa.activosprocesos.concat('\n', this.entradaActaPrevios[i].activosprocesos);
      this.entradaActaTMP.activosprocesos = this.entradaActaTMP.activosprocesos +'\n'+  this.entradaActaPrevios[i].activosprocesos + ' ->' + this.entradaActaPrevios[i].participa;
      
      console.log(this.entradaActaPrevios[i]);
      this.entradaActaTMP.identrada =this.entradaActaPrevios[i].identrada;


    }
  }
  async actualizarActaNuevo() {
    //guardarEntradaDelActa
    this.acta = new Actas(0, 0);
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);


    var Salida = {
      'identrada':  this.entradaActa.identrada,
      'activosprocesos': this.entradaActa.activosprocesos,
      'acuerdos': this.entradaActa.acuerdos,
      'estado': this.entradaActa.estado,
      'factores': this.entradaActa.factores,
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    console.log(Salida);
    await this.entradactaService.actualiazrEntradaDelActa(Salida).subscribe(
      ok => {
        console.log(ok);
      },
      error => {
        console.log('ERROR:');
        console.error(error.error.messages);


      }
    );
    location.reload();
  }

  async guardarActaNuevo() {
    //guardarEntradaDelActa
    this.acta = new Actas(0, 0);
    var PROYECTO = JSON.parse(localStorage.getItem('proyectoParticipacion') || '{}');
    //console.log(this.entradaActa);


    var Salida = {
      'activosprocesos': this.entradaActa.activosprocesos,
      'acuerdos': this.entradaActa.acuerdos,
      'estado': this.entradaActa.estado,
      'factores': this.entradaActa.factores,
      'idfase': PROYECTO.idfase,
      'idproyecto': PROYECTO.idproyecto,
      'participa': localStorage.getItem("usuario")

    };
    console.log(Salida);
    await this.entradactaService.guardarEntradaDelActa(Salida).subscribe(
      ok => {
        console.log(ok);
      },
      error => {
        console.log('ERROR:');
        console.error(error);


      }
    );
    location.reload();

  }

  public guardarActa(): void {

    this.acta = new Actas(0, 0);
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);
    if (idProyecto > 0) {
      this.crearReunion(idProyecto);
      //this.crearActa();
    } else {
      window.alert('Seleccione un proyecto');
    }

  }

  public crearReunion(ProyectoId: number) {
    console.log('--------- public crearReunion() CON EL ID DE PROYECTO');
    // Por el momento, se manda por defecto el valor 1 NO SE CAMBIA porque el servicio fallará
    this.reunion = new Reunion(0, "Reunion Generica", "Sin descripción", ProyectoId, 1);
    console.log('sE MANDA EL SIGUIENTE FORMATO DE REUNION \n', this.reunion);

    this.reunionService.save(this.reunion).subscribe(
      data => {
        console.log('data de reuniones para EL ACTA****');
        console.log('data Reuniones : ' + data.idreuniones);
        localStorage.setItem("idreunion", data.idreuniones);
        console.log('*************');
        console.log(localStorage.getItem("idreunion"));
        console.log('*************');
        this.crearActa(data.idreuniones);

      },

      err => {
        console.log('error en la reuniones', err.error.error);
        this.messages = err.error.error;
      }
    );

  }

  public crearActa(cosa: any) {

    console.log('--------- public crearActa(');
    console.log('-> reuniones en Acta', cosa);
    localStorage.setItem("idreunion", cosa);
    console.log('-> idReunionLoca ', localStorage.getItem("idreunion"));
    if (this.acta.idreuniones == null) {
      window.alert('ERROR EN EL IDENTIFICADOR DE LAS REUNIONES');
    } else {
      this.acta.idreuniones = cosa;
      console.log(this.acta);
      this.actaService.save(this.acta).subscribe(
        data => {
          console.log('data de creacion de un  ACTA');
          console.log(data);
          console.log(data.idactas);
          localStorage.setItem("idactas", data.idactas);

          var variable = JSON.parse(localStorage.getItem("datosActa") || '{}');
          variable.entradactaValidate = true;
          localStorage.setItem("datosActa", JSON.stringify(variable));

          this.crearEntrada(data.idactas);

        },
        err => {
          console.log('erroe en craciones del ACTA', err.error.error);

          this.messages = err.error.error;
        }
      );

    }
  }

  public crearEntrada(iDacta: any) {
    console.log('IDE DE LA ACTA PARA GRABAR LA ENTRADA DEL ACTA : ', iDacta)
    if (iDacta > 0) {
      this.entradaActa.identrada = 0;
      this.entradaActa.idActa = iDacta;

      console.log(this.entradaActa);

      this.entradactaService.save(this.entradaActa).subscribe(
        data => {
          console.log('data de ENTRADA DEL ACTA');
          console.log(data);
          this.grabarEntrada(data.identrada);
          //window.alert("Nueva acta guardada ");



          window.location.reload();
          //  this.router.navigate(['/seguimiento-proyecto']);


        },
        err => {
          console.log('ERROR EN ENTRADA DEL ACTA',
            err.error.error);

          this.messages = err.error.error;
        }
      );
    } else {
      window.alert('error en el identificador del ACTA');
    }
  }

  public abrirModal(nameError: String, titleModule: String) {
    this.dialog.open(DialogComponent, { data: { typeError: nameError, title: titleModule } });
  }


  public buscarEntradaPorActa() {
    //revisar bien la variable
    console.log('->>>>> buscarEntradaPorActa');
    var idproyecto = JSON.parse(localStorage.getItem('idproyecto') || '');
    console.log('->>>>>ID DEL PROYECTO ES: ', idproyecto);

    this.entradaService.findEntradaDelActa(idproyecto).subscribe(
      data => {
        console.log('Se encontro la entrada del acta con base al ID PROYECTO = ', data);
        if (data[0] != null) {
          console.log('Se encontro la entrada del acta con base al ID PROYECTO = ', data[0]);

          this.entradaActa = data[0];

          // window.alert(data[0].acuerdos);
        }
      },
      err => {
        console.log(err.error.error);
        window.alert(err.error.error);

      }
    );
  }


  public updateEntrada() {
    this.entradaService.update(this.entradaActa).subscribe(
      data => {
        console.log('data ->>>', data);
        this.entradaActa = data;
        window.alert("actualizo entradas del acta");
        this.dialog.closeAll();
      }, err => {
        console.log(err.error.error);
      });


    window.location.reload();
  }

  public grabarEntrada(identrada: any) {
    console.log('*** id de la entrdaa grabda:', identrada)
    localStorage.setItem("entradaActaId", String(identrada));
    console.log('**  id de la entrdaa grabda:', localStorage.getItem("entradaActaId"))
  }

  public guardarAcuerdos() {
    console.log('++++++++++++++++++++++++');
    console.log(this.entradaActa.acuerdos);
    this.acuerdosEnable = false;
    /*identrada:number,
    acuerdos:string,
    factores:string,
    activosprocesos:string,
    idactas:number*/
  }
  public guardarFactores() {
    console.log('++++++++++++++++++++++++');
    console.log(this.entradaActa.factores);
    this.factoresEnable = false;

    /*identrada:number,
    acuerdos:string,
    factores:string,
    activosprocesos:string,
    idactas:number*/
  }
  public guardarActivos() {
    console.log('++++++++++++++++++++++++');
    console.log(this.entradaActa.activosprocesos);

    this.activosEnable = false;
    /*identrada:number,
    acuerdos:string,
    factores:string,
    activosprocesos:string,
    idactas:number*/
  }
}
