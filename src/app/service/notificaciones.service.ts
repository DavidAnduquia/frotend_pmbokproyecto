import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { notificaciones } from '../domain/notificaciones';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private url: string = environment.apiUrl + 'notificaciones/'
  constructor(public httpClient: HttpClient) { }

  public Enviados(correo:String): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarEnviados/'+correo);
  }
  public Recibidos(correo:String): Observable<any> {

    return this.httpClient.get(this.url + 'BuscarRecibidos/'+correo);
  }
  
  public contarMensajes(correo:String): Observable<any> {

    return this.httpClient.get(this.url + 'contarMensajes/'+correo);
  }

  public cambiarEstado(data:notificaciones): Observable<any> {
    return this.httpClient.post(this.url + 'editarEstado/',data);
  }


  
  public CrearNotificacionMatricula(notificacion:notificaciones): Observable<any> {

    return this.httpClient.post(this.url + 'CrearNotificacionMatricula',notificacion);
  }

}
