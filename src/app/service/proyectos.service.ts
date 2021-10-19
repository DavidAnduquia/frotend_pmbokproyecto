import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../domain/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private url:string=environment.apiUrl+'proyecto/'
  

  constructor(public httpClient:HttpClient) { }

/*
  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    //console.log(token)
    let headers=new HttpHeaders({'Authorization':token});
    return headers;
  }
*/


  public findAll():Observable<any>{
    //let header=this.createTokenHeader();
    console.log(this.url+'findByAll')
    return this.httpClient.get(this.url+'findByAll');
  }

  
  public BuscarParticipaciones(email:String):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url+'BuscarParticipaciones/'+email);
  } 

  public findById(idproyecto:number):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url+'finById/'+idproyecto);
  }
  public findByEmail(email:string):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url+'finByEmail/'+email);
  }

  public save(proyecto:Proyecto):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url+'save',proyecto);
  }

  public update(proyecto:Proyecto):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.put(this.url+'update',proyecto);
  }

  public delete(idproyecto:number):Observable<any>{
   // let header=this.createTokenHeader();
    return this.httpClient.delete(this.url+'delete/'+idproyecto);
  }
}
