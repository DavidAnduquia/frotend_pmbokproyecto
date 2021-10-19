import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Entradas } from 'src/app/domain/pdp/entradas';
import { Herramientas } from 'src/app/domain/pdp/herramientas';
import { Pdp } from 'src/app/domain/pdp/pdp';
import { ValidarPdp } from 'src/app/domain/pdp/validarPdp';

@Injectable({
  providedIn: 'root'
})
export class PdpServicesService {
  private url: string = environment.apiUrl + 'pdp/';
  constructor(
    public httpClient: HttpClient
  ) { }

  public validarPdp(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'validarPdp/' + id);
  }

  /*  Servicios de Guardado */
  public savePdp(pdp: Pdp): Observable<any> {
    return this.httpClient.post(this.url + 'savePdp', pdp);
  }
  public savePdpPorIdProyecto(id: number): Observable<any> {
    console.log(this.url + 'savePdpPorIdProyecto/' + id);

    return this.httpClient.get(this.url + 'savePdpPorIdProyecto/' + id);
  }


  public saveHerramientasPdp(herramientaspdp: Herramientas): Observable<any> {
    return this.httpClient.post(this.url + 'saveHerramientasPdp', herramientaspdp);
  }

  public saveEntradasPdp(entradaPdp: Entradas): Observable<any> {
    return this.httpClient.post(this.url + 'saveEntradasPdp', entradaPdp);
  }


  /*  Servicios de consulta */
  public findByIdPdp(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarPdp/' + id);
  }

  public findByIdHerramientasPdp(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarHerramientasPdp/' + id);
  }
  public findByIdEntradasPdp(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarEntradasPdp/' + id);
  }/* FIN Servicios de consulta */





  public BuscarPdpPorIdProyecto(idproyecto: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarEntradasPdpPorIdDelProyecto/' + idproyecto);
  }

  public BuscarHerramientasPdpPorIdDelProyecto(idproyecto: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarHerramientasPdpPorIdDelProyecto/' + idproyecto);
  }


  public updateEntradasPdp(entradaPdp: Entradas): Observable<any> {
    return this.httpClient.put(this.url + 'updateEntradaPDP', entradaPdp);
  }


  public updateHerramientasPdp(herramientasPdp: Herramientas): Observable<any> {
    return this.httpClient.put(this.url + 'updateHerramientaPDP', herramientasPdp);
  }


  /**************************
   * 
   * METODOS NUEVOS PARA LA BUSQUEDAD DE DATOS PREVIOS, GUARDAR Y ACTUALIZAR DATA
   * 28/9/2021
   * 
   */
  // método de ENTRADA PARA DATOS PREVIOS

  /*  Servicios de Entrada */
  public datosPreviosEntradaPdp(datosEntradaPdp: any): Observable<any> {
    return this.httpClient.put(this.url + 'BuscarDatosDeEntradasDePDP', datosEntradaPdp);
  }

  public guardarEntradaDelPDP(entradacta: any): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url + 'guardarEntradaDelpdp', entradacta);
  }

  
  public actualiazrEntradaDelPDP(entradacta: any): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url + 'actualiazrEntradaDelpdp', entradacta);
  }

  /*  Servicios de HERAMIENTA */ 
  public datosPreviosHerramientaPdp(datosEntradaPdp: any): Observable<any> {
    return this.httpClient.put(this.url + 'BuscarDatosDeHerrmientaDePDP', datosEntradaPdp);
  }


  public guardarHerramientaDelPDP(entradacta: any): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url + 'guardarHerramientaDelpdp', entradacta);
  }

  public actualiazrHerramientaDelPDP(entradacta: any): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url + 'actualiazrHerramientaDelpdp', entradacta);
  }



}
