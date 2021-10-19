import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Participacion } from '../domain/participacion';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionService {
  
  private url:string=environment.apiUrl+'api/participacion/'
  

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
    return this.httpClient.get(this.url+'findAll');
  }

  public findById(idrol:number):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url+'findById/'+idrol);
  }

  public save(participacion:Participacion):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url+'save',participacion);
  }

  public update(participacion:Participacion):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.put(this.url+'update',participacion);
  }

  public delete(idrol:number):Observable<any>{
   // let header=this.createTokenHeader();
    return this.httpClient.delete(this.url+'delete/'+idrol);
  }
}
