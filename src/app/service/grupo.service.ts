import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GrupoDto } from '../domain/GrupoDto';
import { CrearfaseConResponsablesDTO } from '../domain/CrearfaseConResponsablesDTO';
import { ControlFases } from '../domain/ControlFases';
@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private url: string = environment.apiUrl + 'grupo/'

  constructor(public httpClient: HttpClient) { }

  public tipoDeRoles(): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.get(this.url + 'tipoDeRoles');
  }

  public matricular(grupoDto: GrupoDto): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url + 'matricular', grupoDto);
  }

  public fasesDelProyecto(): Observable<any> {
    return this.httpClient.get(this.url + 'fasesDelProyecto')
  }

  public grupoDeTrabajo(idProyecto: number): Observable<any> {
    return this.httpClient.get(this.url + 'grupoDeTrabajo/' + idProyecto);
  } 

  public faseResponsables(crearfaseConResponsablesDTO: CrearfaseConResponsablesDTO): Observable<any> {
    //let header=this.createTokenHeader();
    return this.httpClient.post(this.url + 'faseResponsables', crearfaseConResponsablesDTO);
  }

  // MEtodo para obtener los datos de la reuniones teniendo en cuenta el ID/email del usuario ADMIN
  public controlProFase(idUsuario: String): Observable<any> {
    return this.httpClient.get(this.url + 'consultarIdsUser/' + idUsuario); 
    

  }
  public responsablesEnFaseoReunion(idFase:number): Observable<any> {
    
    return this.httpClient.get(this.url + 'responsablesEnFaseoReunion/'+idFase);
  }

  public consultarParticipaciones(email:String,idFase:number): Observable<any> {
    
    return this.httpClient.get(this.url + 'consultarParticipaciones/'+email+'/'+idFase);
  }

}

