import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  asyncTabs: Observable<ExampleTab[]>;
  
  
  constructor() {
    
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      //console.log('aca ->',typeof(groComponent));
      
      setTimeout(() => {
        observer.next([
          { label: 'Mis proyectos', content: 'Proyectos Creados' },
          { label: 'Participaciones', content: 'Participaciones' },
          { label: 'Todos los proyectos', content: 'Proyectos de otros usuarios' },
          { label: 'Crear proyecto', content: 'Crear proyecto' },
        ]);
      }, 1000);
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('datosActa');
    localStorage.removeItem('datosPDP');
    localStorage.removeItem('datosPGA');
    localStorage.removeItem('idproyecto');
    localStorage.removeItem('proyectoParticipacion');
    localStorage.removeItem('idPga');
    localStorage.removeItem('nombreProyecto');
  }





}
