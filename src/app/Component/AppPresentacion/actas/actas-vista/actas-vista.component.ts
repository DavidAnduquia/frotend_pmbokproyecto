import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actas-vista',
  templateUrl: './actas-vista.component.html',
  styleUrls: ['./actas-vista.component.css']
})
export class ActasVistaComponent implements OnInit {

  public entradaVista: boolean = false;
  public casoVista: boolean = false;
  public planVista: boolean = false;
  public herramientaVista: boolean = false;
  public cambiazo: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(this.cambiazo == true){
      this.entradaVista = true;
      alert("cambiazo paso a true");
    }
  }
  public entradaM(): void {
    this.falseTotal();
    this.entradaVista = true;
    this.cambiazo = true;
  }
  public casoM(): void {
    this.falseTotal();
    this.casoVista = true;
    this.cambiazo = true;
  }
  public planM(): void {
    this.falseTotal();
    this.planVista = true;
  }
  public herramientaM(): void {
    this.falseTotal();
    this.herramientaVista = true;
  }

  public falseTotal(): void {
    this.cambiazo = false;
    this.entradaVista = false;
    this.casoVista = false;
    this.planVista = false;
    this.herramientaVista = false;

  }
}
