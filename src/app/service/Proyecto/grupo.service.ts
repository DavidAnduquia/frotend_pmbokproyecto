import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grupo } from 'src/app/domain/grupo';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private url:string=environment.apiUrl+'api/grupo/'
  

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

  public findById(idgrupo:number):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url+'findById/'+idgrupo);
  }

  public save(grupo:Grupo):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url+'save',grupo);
  }

  public update(grupo:Grupo):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.put(this.url+'update',grupo);
  }

  public delete(idgrupo:number):Observable<any>{
   // let header=this.createTokenHeader();
    return this.httpClient.delete(this.url+'delete/'+idgrupo);
  }
}
