import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/domain/roles';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url:string=environment.apiUrl+'api/rol/'
  

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

  public save(roles:Rol):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url+'save',roles);
  }

  public update(roles:Rol):Observable<any>{
    //let header=this.createTokenHeader();
    return this.httpClient.put(this.url+'update',roles);
  }

  public delete(idrol:number):Observable<any>{
   // let header=this.createTokenHeader();
    return this.httpClient.delete(this.url+'delete/'+idrol);
  }
}
