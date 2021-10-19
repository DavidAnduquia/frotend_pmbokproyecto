import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HerramientasActa } from '../../domain/herramientasactas';

@Injectable({
  providedIn: 'root'
})
export class HerramientasactaService {
  private url:string=environment.apiUrl+'herramientasActa/'
  

  constructor(public httpClient:HttpClient) { }

/*
  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    //console.log(token)
    let headers=new HttpHeaders({'Authorization':token});
    return headers;
  }
*/

public actualiazrHerramientasDelActa(herramientasactas: any): Observable<any> {
  //let header=this.createTokenHeader();
  return this.httpClient.post(this.url + 'actualiazrHerramientasDelActa', herramientasactas);
}

public guardarHerramientasNuevo(herramientasactas:any):Observable<any>{
  //let header=this.createTokenHeader();
  return this.httpClient.post(this.url+'guardarHerramientasDelActa',herramientasactas);
}

  public findAll():Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url+'findAll');
  }

  public findById(idherramienta:number):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url+'finById/'+idherramienta);
  }

  public findherramientaDelActa(idProyecto:number):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url+'findHerramientaDelActa/'+idProyecto);
  }


  public save(herramientasactas:HerramientasActa):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url+'save',herramientasactas);
  }

  public BuscarDatosDeHerramietasPrevias(herramientasactas: any): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url + 'BuscarDatosDeHerramietasPrevias', herramientasactas);
  }
  public update(herramientasactas:HerramientasActa):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.put(this.url+'updateHerramientasAcata',herramientasactas);
  }

  public delete(idherramienta:number):Observable<any>{
   // let header=this.createTokenHeader();
    return this.httpClient.delete(this.url+'delete/'+idherramienta);
  }
}
