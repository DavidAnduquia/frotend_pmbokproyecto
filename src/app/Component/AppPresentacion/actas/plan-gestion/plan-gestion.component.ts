import { Component, OnInit } from '@angular/core';
import { PlanGestioBeneficio } from 'src/app/domain/plangestionbeneficio';
import { PlangestionbeneficioService } from 'src/app/service/Actas/plangestionbeneficio.service';

@Component({
  selector: 'app-plan-gestion',
  templateUrl: './plan-gestion.component.html',
  styleUrls: ['./plan-gestion.component.css']
})
export class PlanGestionComponent implements OnInit {

  public datosPlan !:  PlanGestioBeneficio;
  public vista:Boolean=false;

  public vistaacciones  :Boolean=false;
  public vistacomponentes :Boolean=false;
  public vistaprodcutos  :Boolean=false;
  public vistaservicios :Boolean=false;
  public vistaresultado  :Boolean=false;
  constructor(
    public planService:PlangestionbeneficioService
  ) { }

  ngOnInit(): void {
    this.buscarherramientasPorActa();

  }

  public Veracciones   (){
    if(this.vistaacciones==false){
      return this.vistaacciones= true;

    }else{
      return this.vistaacciones =false;
    }
  }
  
  public Vercomponentes   (){
    if(this.vistacomponentes==false){
      return this.vistacomponentes= true;

    }else{
      return this.vistacomponentes =false;
    }
  }
  public Verprodcutos   (){
    if(this.vistaprodcutos==false){
      return this.vistaprodcutos= true;

    }else{
      return this.vistaprodcutos =false;
    }
  }
  public Verservicios   (){
    if(this.vistaservicios==false){
      return this.vistaservicios= true;

    }else{
      return this.vistaservicios =false;
    }
  }
  public Verresultado   (){
    if(this.vistaresultado==false){
      return this.vistaresultado= true;

    }else{
      return this.vistaresultado =false;
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
    /*
    Se debe tener previamente cargado el ID del acta
    para hacer un FindByAI
    */
    //console.log('->>>>> buscarherramientasPorActa');
    var idproyecto = JSON.parse(localStorage.getItem('idproyecto') || '{}');
    //console.log('->>>>>',idproyecto);
    this.planService.findplanGestionDelActa(idproyecto).subscribe(
      data => {
        //console.log('->>>>> buscarherramientasPorActa');
        console.log(data);
        this.datosPlan = data[0];
        console.log(this.datosPlan)
      },

      err => {
        console.log(err.error.error);
        window.alert('Plan gestion Beneficios ' + err.error.error);

      }
    );
  }
}
