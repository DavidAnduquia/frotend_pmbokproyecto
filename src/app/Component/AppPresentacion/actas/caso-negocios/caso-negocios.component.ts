import { Component, OnInit } from '@angular/core';
import { CasoNegocio } from 'src/app/domain/casonegocio';
import { CasonegocioService } from 'src/app/service/Actas/casonegocio.service';
@Component({
  selector: 'app-caso-negocios',
  templateUrl: './caso-negocios.component.html',
  styleUrls: ['./caso-negocios.component.css']
})
export class CasoNegociosComponent implements OnInit {

  public datosCasoNegocio !: CasoNegocio;

  public vista:Boolean=false;
  public vistaMetas   :Boolean=false;
  public vistaobjetivos   :Boolean=false;
  public vistaincidentes   :Boolean=false;
  public vistaoportunidades   :Boolean=false;

  constructor(
    public casoNegocioService: CasonegocioService
  ) { }

  ngOnInit(): void {
    this.buscarCasoDeNegocioPorEntrada();
  }

 /*
    componenetes de las caso de negocio
  */
    public VerMetas  (){
      if(this.vistaMetas==false){
        return this.vistaMetas= true;
  
      }else{
        return this.vistaMetas =false;
      }
    }
    public Verobjetivos  (){
      if(this.vistaobjetivos==false){
        return this.vistaobjetivos= true;
  
      }else{
        return this.vistaobjetivos =false;
      }

    }
    public Verincidentes  (){
      if(this.vistaincidentes==false){
        return this.vistaincidentes= true;
  
      }else{
        return this.vistaincidentes =false;
      }

    }
    public Veroportunidades   (){
      if(this.vistaoportunidades==false){
        return this.vistaoportunidades= true;
  
      }else{
        return this.vistaoportunidades =false;
      }
    }
    public Ver(){
      if(this.vista==false){
        return this.vista= true;
  
      }else{
        return this.vista =false;
      }
    }

  public buscarCasoDeNegocioPorEntrada() {
  
    console.log('->>>>>buscarCasoDeNegocioPorEntrada');
    var idproyecto = JSON.parse(localStorage.getItem('idproyecto') || '');
    console.log('->>>>>',idproyecto);
    this.casoNegocioService.findherramientaDelActa(idproyecto).subscribe(
      data => {
        console.log('data'); 
        console.log(data);
        console.log(data[0]);
        console.log('data');
        this.datosCasoNegocio = data[0];
      },

      err => {
        console.log(err.error.error);
        window.alert(err.error.error);

      }
    );
  
  }  


}

