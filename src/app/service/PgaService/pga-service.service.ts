import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntradaPga } from 'src/app/domain/pga/EntradaPga';
import { PgaHerramientas } from 'src/app/domain/pga/PgaHerramientas';
import { Pga } from 'src/app/domain/pga/pga';

@Injectable({
  providedIn: 'root'
})
export class PgaServiceService {
  private url: string = environment.apiUrl + 'pga/';
  constructor(public httpClient: HttpClient) { }

  public validarPga(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'validarPga/' + id);
  }
  public findIdPgaForIdProyecto(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarPgaPorIdProyecto/' + id);
  }

  // Guardar el pga con base al ID del proyecto // despues de esta consulta, se procede a guardar los objetvos con la info de Entrada y herramientas
  public savePgaPorIdProyecto(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'savePgaPorIdProyecto/' + id);
  }


  /*  Servicios de Guardado */
  public savePga(pga: Pga): Observable<any> {
    return this.httpClient.post(this.url + 'savePga', pga);
  }

  public saveHerramientasPga(herramientas: PgaHerramientas): Observable<any> {
    return this.httpClient.post(this.url + 'saveHerramientasPga', herramientas);
  }

  public saveEntradasPga(entradas: EntradaPga): Observable<any> {
    return this.httpClient.post(this.url + 'saveEntradasPga', entradas);
  }
  /*  FIN Servicios de Guardado */


  /*  Servicios de consulta */
  public findByIdPga(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarPga/' + id);
  }

  public findHerramientaByIdPga(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarHerramientasPdp/' + id);
  }

  public findEntradaByIdPga(id: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarEntradasPdp/' + id);
  }
  /* FIN Servicios de consulta */


  public BuscarEntradasPGAPorIdDelProyecto(idproyecto: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarEntradasPGAPorIdDelProyecto/' + idproyecto);
  }

  public BuscarHerramientasPGAPorIdDelProyecto(idproyecto: number): Observable<any> {
    return this.httpClient.get(this.url + 'BuscarHerramientasPGAPorIdDelProyecto/' + idproyecto);
  }


  public updateEntradasPga(entradas: EntradaPga): Observable<any> {
    return this.httpClient.put(this.url + 'updateEntradasPGA', entradas);
  }


  public updateHerramientasPga(pgaHerramientas: PgaHerramientas): Observable<any> {
    return this.httpClient.put(this.url + 'updateHerramientasPGA', pgaHerramientas);
  }


  /**
   * 
   * Métododes nuevoas para guardar actualizar y buscar datosa previos
   */

  public xxx(data: any): Observable<any> {
    return this.httpClient.post(this.url + 'xxx', data);
  }

  // método para guardas 
  public guardarEntradaDelpga(data:any):Observable<any>{
    return this.httpClient.post(this.url + 'guardarEntradaDelpga',data);
  }
  // método para guardas 
  public guardarHerramientaDelpga(data:any):Observable<any>{
    return this.httpClient.post(this.url + 'guardarHerramientaDelpga',data);
  }
  // método para Buscar 
  public BuscarDatosDeEntradasDePGA(data:any):Observable<any>{
    return this.httpClient.post(this.url + 'BuscarDatosDeEntradasDePGA',data);
  }
  // método para gBuscar
  public BuscarDatosDeHerrmientaDePGA(data:any):Observable<any>{
    return this.httpClient.post(this.url + 'BuscarDatosDeHerrmientaDePGA',data);
  }

  /**
   * ******************************************************************** 
   * ********************************************************************
   */
}
