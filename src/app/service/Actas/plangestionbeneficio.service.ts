import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanGestioBeneficio } from '../../domain/plangestionbeneficio';

@Injectable({
  providedIn: 'root'
})
export class PlangestionbeneficioService {

  private url: string = environment.apiUrl + 'PlanGestionBeneficios/'


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

  public findById(id_plan_gb: number): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url + 'finById/' + id_plan_gb);
  }

  public findplanGestionDelActa(idProyecto: number): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url + 'findPlanGestionDelActa/' + idProyecto);
  }
  public save(plangestionbeneficio: PlanGestioBeneficio): Observable<any> {
    //let header=this.createTokenHeader();
    console.log('.........', plangestionbeneficio);
    return this.httpClient.post(this.url + 'save', plangestionbeneficio);
  }

  public update(plangestionbeneficio: PlanGestioBeneficio): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.put(this.url + 'updatePlanGestionBeneficio', plangestionbeneficio);
  }

  public delete(id_plan_gb: number): Observable<any> {
    // let header=this.createTokenHeader();
    return this.httpClient.delete(this.url + 'delete/' + id_plan_gb);
  }

  // Métodos para guardar Datos de Plan Gestion de beneficios 
  public guardarPlanDeBeneficiosNuevo(planGesionBeneficio: any): Observable<any> {
    return this.httpClient.post(this.url + 'guardarPlan-gestion-beneficioDelActa', planGesionBeneficio);

  }
  public updatePlanNuevo(planGesionBeneficio: any): Observable<any> {
    return this.httpClient.post(this.url + 'actualizarPlan-gestion-beneficioDelActa', planGesionBeneficio);

  }

  public BuscarDatosDePlanBeneficiosPrevias(herramientasactas: any): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url + 'BuscarDatosDePlanBeneficiosPrevias', herramientasactas);
  }
}
