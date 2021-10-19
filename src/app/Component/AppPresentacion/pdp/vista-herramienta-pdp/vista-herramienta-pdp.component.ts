import { Component, OnInit } from '@angular/core';
import { Herramientas } from 'src/app/domain/pdp/herramientas';
import { PdpServicesService } from 'src/app/service/PdpService/pdp-services.service';

@Component({
  selector: 'app-vista-herramienta-pdp',
  templateUrl: './vista-herramienta-pdp.component.html',
  styleUrls: ['./vista-herramienta-pdp.component.css']
})
export class VistaHerramientaPdpComponent implements OnInit {

  public herramientasPDP !: Herramientas;

  constructor(
    public entradaPdpService: PdpServicesService
  ) { 
    
  }

  ngOnInit(): void {
    this.buscarHerramientasPdp();
  }


  buscarHerramientasPdp(){
    var idproyecto = localStorage.getItem("idproyecto");
    const b = Number(idproyecto);

    this.entradaPdpService.BuscarHerramientasPdpPorIdDelProyecto(b).subscribe (
      data => {
        this.herramientasPDP = data ;
      });
    }
}
