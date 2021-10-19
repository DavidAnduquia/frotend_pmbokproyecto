import { Component, OnInit } from '@angular/core';
import { HerramientasActa } from 'src/app/domain/herramientasactas';
import { HerramientasactaService } from 'src/app/service/Actas/herramientasacta.service';

@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styleUrls: ['./herramientas.component.css']
})
export class HerramientasComponent implements OnInit {

  public datosHerramientas !: HerramientasActa;
  public vista:Boolean=false;
  public vistajuicioexpertos  :Boolean=false;
  public vistarecopilaciondatos  :Boolean=false;
  public vistahabilidades  :Boolean=false;
  public vistaReuniones  :Boolean=false;
  constructor(
    public herramientasService: HerramientasactaService
  ) { }

  ngOnInit(): void {
    this.buscarherramientasPorActa();
  }
   /*
    componenetes de las Herramientas del Acta
  */
    public Verjuicioexpertos  (){
      if(this.vistajuicioexpertos==false){
        return this.vistajuicioexpertos= true;
  
      }else{
        return this.vistajuicioexpertos =false;
      }

    }

    public Verrecopilaciondatos  (){
      if(this.vistarecopilaciondatos==false){
        return this.vistarecopilaciondatos= true;
  
      }else{
        return this.vistarecopilaciondatos=false;
      }

    }
    
    public Verhabilidades (){
      if(this.vistahabilidades==false){
        return this.vistahabilidades= true;
  
      }else{
        return this.vistahabilidades =false;
      }

    }
    public VerReuniones (){
      if(this.vistaReuniones==false){
        return this.vistaReuniones= true;
  
      }else{
        return this.vistaReuniones =false;
      }

    }

  public Ver(){
    if(this.vista==false){
      return this.vista= true;

    }else{
      return this.vista =false;
    }
  }

  public buscarherramientasPorActa() {
  
    console.log('->>>>> buscarherramientasPorActa');
    var idproyecto = JSON.parse(localStorage.getItem('idproyecto') || '');
    console.log('->>>>>',idproyecto);
    this.herramientasService.findherramientaDelActa(idproyecto).subscribe(
      data => {
        console.log(data);
        this.datosHerramientas = data[0];
      },

      err => {
        console.log(err.error.error);
        window.alert('Herramientas ' + err.error.error);

      }
    );
  }

}
