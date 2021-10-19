import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubGrupo } from 'src/app/domain/subgrupo';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class SubgrupoService {
  
  private url:string=environment.apiUrl+'api/subgrupo/'
  

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

  public findById(id_sub_grupo:number):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url+'findById/'+id_sub_grupo);
  }

  public save(subgrupo:SubGrupo):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url+'save',subgrupo);
  }

  public update(subgrupo:SubGrupo):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.put(this.url+'update',subgrupo);
  }

  public delete(id_sub_grupo:number):Observable<any>{
   // let header=this.createTokenHeader();
    return this.httpClient.delete(this.url+'delete/'+id_sub_grupo);
  }
}
