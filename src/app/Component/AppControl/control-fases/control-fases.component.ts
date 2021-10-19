import { Component, OnInit } from '@angular/core';
import { ControlFases } from 'src/app/domain/ControlFases';
import { ResponsablesDTO } from 'src/app/domain/ResponsablesDTO';
import { GrupoService } from 'src/app/service/grupo.service';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/domain/proyectos';
import { Reunion } from 'src/app/domain/reunion';
import { FaseProyecto } from 'src/app/domain/faseproyecto';
import { ControlFase_01DTO } from 'src/app/domain/controlFasesDTOs/ControlFase_01DTO copy 2';

@Component({
  selector: 'app-control-fases',
  templateUrl: './control-fases.component.html',
  styleUrls: ['./control-fases.component.css']
})

export class ControlFasesComponent implements OnInit {

  //public Reuniones !: ControlFases[];
  public Reuniones !:ControlFase_01DTO[];
  public proyectosList !: Proyecto[];
  public reunionesList !: Reunion[];
  public fasesList !: FaseProyecto[];
  public responsables !: ResponsablesDTO[];
  public mensajeAlerta !: String;
  today = Date.now();
  fixedTimezone = this.today;
  constructor(
    public servicios: GrupoService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.controlProFase();
  }
  private mostrardata(): void {
    console.table(this.Reuniones);
    var d = new Date('2021-08-21T05:00:00.000+00:00');
    console.log(d.getFullYear()); // Hours
    console.log(d.getMonth());
    console.log(d.getDay());

    
    /*this.Reuniones.forEach(element => {
      this.fasesList.push(element.fases) ;
      console.table(element.proyectos);
       console.table(element.reuniones);
      console.table(element.fases);
      console.log('\n\n\n\ns');


    });*/
  }
  public async controlProFase() {
    console.log('Control-Reuniones-Por-Fase');
    
    const idUser = localStorage.getItem('usuario') || "none";
    if (idUser != "none" || idUser != null || idUser != undefined) {
      await this.servicios.controlProFase(idUser).subscribe(
        data => {


          this.Reuniones = data;
          console.log("************");
          console.log(this.Reuniones);
          console.log("************");
          this.mostrardata();
        },
        error => {
          this.mensajeAlerta = error;

        }
      );

    } else {
      this.mensajeAlerta = "No se encontro Usuario en session";

    }
  }

  public async verGrupo(idFase: number) {
    console.clear();
    
    console.log("public async verGrupo(idFase: ",idFase,") {");
    
    var salida = JSON.parse('{}');
    await this.servicios.responsablesEnFaseoReunion(idFase).subscribe(
      data => {
        this.responsables = data;
      },
      error => {
        this.responsables = [];
        //console.error(error.error.message);
        salida = error.error.message;
        //salida = JSON.parse( salida|| '{}');
        console.log(salida);

      }
    );

  }
  public VolverAControl(): void {
    this.router.navigate(['/Control']);

  }


}

