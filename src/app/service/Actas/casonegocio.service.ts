import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CasoNegocio } from '../../domain/casonegocio';

@Injectable({
  providedIn: 'root'
})
export class CasonegocioService {

  private url: string = environment.apiUrl + 'CasoNegocio/'


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
    return this.httpClient.get(this.url + 'findAll');
  }

  public findById(id_caso_negocio: number): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url + 'finById/' + id_caso_negocio);
  }
  public findherramientaDelActa(idProyecto: number): Observable<any> {
    //let header=this.createTokenHeader();
    console.log("se fue con el id", idProyecto)
    return this.httpClient.get(this.url + 'findCasoNegocioDelActa/' + idProyecto);
  }

  public save(casonegocio: CasoNegocio): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url + 'save', casonegocio);
  }

  public update(casonegocio: CasoNegocio): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.put(this.url + 'updateCasoNegocio', casonegocio);
  }

  public delete(id_caso_negocio: number): Observable<any> {
    // let header=this.createTokenHeader();
    return this.httpClient.delete(this.url + 'delete/' + id_caso_negocio);
  }

  public BuscarDatosPrevios(casoDto: any): Observable<any> {
    return this.httpClient.post(this.url + 'BuscarDatosDeCasonegocio', casoDto);
  }
  public guardarCasoNegocioNuevo(casoDto: any): Observable<any> {
    return this.httpClient.post(this.url + 'guardarCasoNegocio', casoDto);
  }

  // Debe ser un método unico para el admin SOLO EL ADMIN PODRA REALIZAR ACTUALIAZACIONES DE REGISTROS
  public updateCasoNegocioNuevo(casoDto: any): Observable<any> {
    return this.httpClient.post(this.url + 'actualizarCasoNegocio', casoDto);
  }
}
