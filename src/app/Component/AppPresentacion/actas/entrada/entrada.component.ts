import { Component, OnInit } from '@angular/core';
import { EntradactaService } from 'src/app/service/Actas/entradacta.service';
import { EntradaActa } from 'src/app/domain/entradacta'

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {
  public datosEntrada !: EntradaActa;
  public vista:Boolean=false;
  public vistaacuerdos :Boolean=false;
  public vistafactores :Boolean=false;
  public vistaactivos :Boolean=false;

  constructor(
    public entradaService: EntradactaService
  ) { }

  ngOnInit(): void {
    this.buscarEntradaPorActa();
  }

  /*
    componenetes de la entrada del acta
  */
    public Veracuerdos (){
      if(this.vistaacuerdos==false){
        return this.vistaacuerdos= true;
  
      }else{
        return this.vistaacuerdos =false;
      }

    }

    public Verfactores (){
      if(this.vistafactores==false){
        return this.vistafactores= true;
  
      }else{
        return this.vistafactores =false;
      }

    }

    public Veractivos (){
      if(this.vistaactivos==false){
        return this.vistaactivos= true;
  
      }else{
        return this.vistaactivos =false;
      }

    }
    



  public Ver(){
    if(this.vista==false){
      return this.vista= true;

    }else{
      return this.vista =false;
    }
  }
  public buscarEntradaPorActa() {
    //revisar bien la variable
    console.log('->>>>> buscarEntradaPorActa');
    var idproyecto = JSON.parse(localStorage.getItem('idproyecto') || '');
    console.log('->>>>>',idproyecto);

    this.entradaService.findEntradaDelActa(idproyecto).subscribe(
      data => {
        console.log('data'); 
        console.log(data);
        console.log(data[0]);
        console.log('data');
        this.datosEntrada = data[0];
      },

      err => {
        console.log(err.error.error);
        window.alert(err.error.error);

      }
    );
  }

}
