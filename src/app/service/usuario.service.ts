import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../domain/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 
  private url: string = environment.apiUrl + 'usuario/'


  constructor(public httpClient: HttpClient) { }

  /*
    createTokenHeader():HttpHeaders{
      let token=localStorage.getItem('token');
      //console.log(token)
      let headers=new HttpHeaders({'Authorization':token});
      return headers;
    }
  */


  public findAll(): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url + 'finByAll');
  }

  public findById(email: String): Observable<any> {
    //let header=this.createTokenHeader();
    console.log('**********');
    console.log(this.url + 'findById/' + email)
    return this.httpClient.get(this.url + 'finById/' + email);
  }

  public save(usuario: Usuario): Observable<any> {
    //let header=this.createTokenHeader();
   // console.log('***********************');
   // console.log(this.url+'save');
  
    return this.httpClient.post(this.url + 'save', usuario);
  }

  /*
  
  
  */


  public update(usuario: Usuario): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.put(this.url + 'update', usuario);
  }

  public delete(email: String): Observable<any> {
    // let header=this.createTokenHeader();
    return this.httpClient.delete(this.url + 'delete/' + email);
  }
}
