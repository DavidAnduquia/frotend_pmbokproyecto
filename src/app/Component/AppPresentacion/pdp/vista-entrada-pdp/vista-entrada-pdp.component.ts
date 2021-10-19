import { Component, OnInit } from '@angular/core';
import { Entradas } from 'src/app/domain/pdp/entradas';
import { PdpServicesService } from 'src/app/service/PdpService/pdp-services.service';

@Component({
  selector: 'app-vista-entrada-pdp',
  templateUrl: './vista-entrada-pdp.component.html',
  styleUrls: ['./vista-entrada-pdp.component.css']
})
export class VistaEntradaPdpComponent implements OnInit {
  public datosEntrada !: Entradas;


  constructor(      
    public entradaPdpService: PdpServicesService
    ) { }


  ngOnInit(): void {
    this.buscarEntradaPdp();
  }


  buscarEntradaPdp(){
    var idproyecto = localStorage.getItem("idproyecto");
    const b = Number(idproyecto);

    this.entradaPdpService.BuscarPdpPorIdProyecto(b).subscribe (
      data => {
        this.datosEntrada = data ;
      });
    }
  
}
