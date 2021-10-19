import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoProyectoService {

  private url: string = environment.apiUrl + 'tipoProyecto/'

  constructor(public httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + 'findAll');
  }

  public findById(tipoId: String): Observable<any> {
    return this.httpClient.get(this.url + 'findByID/' + tipoId);
  }
}
