import { Component, OnInit } from '@angular/core';
import { EntradaPga } from 'src/app/domain/pga/EntradaPga';
import { PgaServiceService } from 'src/app/service/PgaService/pga-service.service';

@Component({
  selector: 'app-vista-entrada-pga',
  templateUrl: './vista-entrada-pga.component.html',
  styleUrls: ['./vista-entrada-pga.component.css']
})
export class VistaEntradaPgaComponent implements OnInit {

  public entradaPga !: EntradaPga;

  constructor(
    public entradaPgaService: PgaServiceService

  ) { }

  ngOnInit(): void {
    this.BuscarEntradasPGAPorIdDelProyecto();
  }


  BuscarEntradasPGAPorIdDelProyecto(){
    var idproyecto = localStorage.getItem("idproyecto");
    const b = Number(idproyecto);

    this.entradaPgaService.BuscarEntradasPGAPorIdDelProyecto(b).subscribe (
      data => {
        this.entradaPga = data ;
      });
    }

}
