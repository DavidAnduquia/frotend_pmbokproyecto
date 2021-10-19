import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  constructor(public httpClient:HttpClient) { }

  public loggedIn():boolean{
    return !!localStorage.getItem('usuario');
  }
 
  public logOut():void{
    localStorage.removeItem('usuario');
  }
}
