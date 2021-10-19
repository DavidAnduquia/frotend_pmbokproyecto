import { Component, OnInit } from '@angular/core';
import { PgaHerramientas } from 'src/app/domain/pga/PgaHerramientas';
import { PgaServiceService } from 'src/app/service/PgaService/pga-service.service';

@Component({
  selector: 'app-vista-herramienta-pga',
  templateUrl: './vista-herramienta-pga.component.html',
  styleUrls: ['./vista-herramienta-pga.component.css']
})
export class VistaHerramientaPgaComponent implements OnInit {

  public pga !: PgaHerramientas;

  constructor(
    public entradaPgaService: PgaServiceService
  ) { }

  ngOnInit(): void {
    this.BuscarEntradasPGAPorIdDelProyecto();
  }


  BuscarEntradasPGAPorIdDelProyecto(){
    var idproyecto = localStorage.getItem("idproyecto");
    const b = Number(idproyecto);

    this.entradaPgaService.BuscarHerramientasPGAPorIdDelProyecto(b).subscribe (
      data => {
        this.pga = data ;
      });
    }


}
