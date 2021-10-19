import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reunion } from 'src/app/domain/reunion';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  private url:string=environment.apiUrl+'Reunion/'
  

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

  public findById(idreuniones:number):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url+'findById/'+idreuniones);
  }

  public save(reunion:Reunion):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url+'save',reunion);
  }

  public update(reunion:Reunion):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.put(this.url+'update',reunion);
  }

  public delete(idreuniones:number):Observable<any>{
   // let header=this.createTokenHeader();
    return this.httpClient.delete(this.url+'delete/'+idreuniones);
  }
}
