import { Pipe, PipeTransform } from '@angular/core';
import { single } from 'rxjs/operators';

@Pipe({
  name: 'filterProyecto'
})
export class FilterProyectoPipe implements PipeTransform {
 

  transform(proyectos:any, strBusqueda : string){
    if(!proyectos) return [];
    if(!strBusqueda) return proyectos;
    strBusqueda = strBusqueda.toLowerCase();
    return proyectos.filter( (datos: { nombre: string; admin: string; }) => {
     return datos.nombre.toLowerCase().includes(strBusqueda)  || datos.admin.toLowerCase().includes(strBusqueda) ;
  });
}
}
