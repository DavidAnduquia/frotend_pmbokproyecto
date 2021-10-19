import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { Router } from '@angular/router'; 
import { notificaciones } from 'src/app/domain/notificaciones';
import { NotificacionesService } from 'src/app/service/notificaciones.service';

@Component({
  selector: 'app-notificaciones-control',
  templateUrl: './notificaciones-control.component.html',
  styleUrls: ['./notificaciones-control.component.css']
})
export class NotificacionesControlComponent implements  OnInit {

   
  displayedColumns: string[] = ['Emisor','Mensaje','Estado'];
  public salida !: String;
  public mensajes !: notificaciones[];
  dataSource !: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(public notificaciones: NotificacionesService,   public router: Router,) { 
    //this.dataSource = new MatTableDataSource(this.mensajes) 
  
  }
 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngOnInit(): void {
    this.BuscarRecibidos();
  }

  public async BuscarRecibidos(){
    let email = localStorage.getItem('usuario') || '';
    if(email === ''){
      this.router.navigate(['/home']);
    }else{
      await this.notificaciones.Recibidos(email).subscribe(data=>{
        console.log(data);
        
        this.mensajes= data;
        this.dataSource = new MatTableDataSource(this.mensajes);
        this.dataSource.paginator = this.paginator;
     
    
      },error =>{
        console.log(error);
        
        this.router.navigate(["/home"]) 
      });
    }
  }

  public async cambiarEstado(data:notificaciones){
    
    await this.notificaciones.cambiarEstado(data).subscribe(
      ok=>{
      console.log(ok);
      this.BuscarRecibidos();
    }, error=>{
      // console.log(error.error.message);
      this.salida=JSON.stringify(error.error.message) ;
      console.log(this.salida);
      
    });
  }
}
