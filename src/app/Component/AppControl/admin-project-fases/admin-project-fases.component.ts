import { Component, OnInit } from '@angular/core';
import { tipofases } from 'src/app/domain/tipofases';
import { Rol } from 'src/app/domain/roles';
import { GrupoService } from 'src/app/service/grupo.service';
import { GrupoDto } from 'src/app/domain/GrupoDto';
import { Usuario } from 'src/app/domain/usuario';
import { CrearfaseConResponsablesDTO } from 'src/app/domain/CrearfaseConResponsablesDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-project-fases',
  templateUrl: './admin-project-fases.component.html',
  styleUrls: ['./admin-project-fases.component.css']
})
/*
Cambios:

10 de agosto se agrega el metodo limitarFases
*/
export class AdminProjectFasesComponent implements OnInit {

  Mensaje !: String;
  Fases!: tipofases[];
  Auxiliar!: tipofases[];
  roles!: Rol[];
  grupoTrabajo !: GrupoDto[];
  usuarioResponsable: Array<any>;
  crearfaseConResponsablesDTO: CrearfaseConResponsablesDTO;

  // Control para seleccionar las fase de trabajo 
  public actaDeConstitucionDelProyecto: Boolean = false;
  public planParaLaDireccionDeProyectos: Boolean = false;
  public planificacionParaLaGestionDelAlcance: Boolean = false;

  constructor(
    public fasesServices: GrupoService,
    public router: Router
  ) {
    this.usuarioResponsable = [];
    this.crearfaseConResponsablesDTO = new CrearfaseConResponsablesDTO(0, 0, "", [], "", "", "", "");


  }

  ngOnInit(): void {
    this.validarDatos(); // Verifica que se apunte a un id de proyecto
    this.buscarFases(); // trae las fases de PMBOK que estan en base de datos
    this.cargarUsuariosEnGrupo(); // Trae a los usuarios agregados al grupo de trabajo
    // this.limitarFases();

  }

  public VolverAControl(): void {
    this.router.navigate(['/Control']);
  }


  private validarDatos(): void {
    if (localStorage.getItem("idproyecto") == undefined || localStorage.getItem("idproyecto") == null || localStorage.getItem("idproyecto") === "") {
      window.location.href = 'http://localhost:4200/home';
    }


  }

  public async buscarFases() {
    await this.fasesServices.fasesDelProyecto().subscribe(
      data => {
        // console.log(data);
        this.Fases = data;
        console.table(this.Fases);
        this.limitarFases(this.Fases);
      },
      error => {
        console.log(error);

      }
    );


  }

  public matricular(): void {
    console.log("---------");
    this.Mensaje = "";
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);
    this.crearfaseConResponsablesDTO.idproyecto = idProyecto;
    let tmp: Array<any> = [];

    this.usuarioResponsable.forEach(element => {
      tmp.push({ 'id': element.idgrupo });
      this.crearfaseConResponsablesDTO.idresponsable = tmp;
    });

    this.crearfaseConResponsablesDTO.tiempoinicio = this.crearfaseConResponsablesDTO.tiempoinicio.replace('-', '/');
    this.crearfaseConResponsablesDTO.tiempoinicio = this.crearfaseConResponsablesDTO.tiempoinicio.replace('-', '/');
    this.crearfaseConResponsablesDTO.tiempofin = this.crearfaseConResponsablesDTO.tiempofin.replace('-', '/');
    this.crearfaseConResponsablesDTO.tiempofin = this.crearfaseConResponsablesDTO.tiempofin.replace('-', '/');

    console.log(this.crearfaseConResponsablesDTO);
    console.log("---------");
    this.fasesServices.faseResponsables(this.crearfaseConResponsablesDTO).subscribe(
      data => {

        console.log(JSON.parse(data));

        setTimeout(() => {
          this.Mensaje = "SE GRABO LA NUEVA REUNION  ";


        }, 3000);
        location.reload();

      },
      error => {
        setTimeout(() => {
          this.Mensaje = error;


        }, 3000);
        console.log(error);
      }
    );


  }


  public cargarFases(): void {

    this.fasesServices.fasesDelProyecto().subscribe(
      data => {
        console.log(data);

        this.Fases = data;

      },
      error => {
        console.log(error);

      }
    );



  }

  public async cargarUsuariosEnGrupo() {
    let x = localStorage.getItem("idproyecto");
    var idProyecto = Number(x);
    await this.fasesServices.grupoDeTrabajo(idProyecto).subscribe(
      data => {
        this.grupoTrabajo = data;
      }, error => {
        console.log(error.message);

      }
    );
  }

  public agregarUsuario(email: String, rol: String, idgrupo: number) {
    var agregar = true;
    this.usuarioResponsable.forEach(element => {
      if (element.nombre == email && element.rol == rol) {
        console.log('repetido');
        agregar = false;
      }
    });
    if (agregar) {
      this.usuarioResponsable.push({ 'nombre': email, 'rol': rol, 'idgrupo': idgrupo });
    }

  }

  public eliminarUsuario(email: String, rol: String) {
    var indice = this.usuarioResponsable.indexOf({ 'nombre': email, 'rol': rol }); // obtenemos el indice
    this.usuarioResponsable.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
  }
  public limitarFases(fases: any): void {
    // En este método se rectifica el avance del proyecto en función del Pmbok, para limitar las fases de trabajo.
    var acta = JSON.parse(localStorage.getItem('datosActa') || '{}');
    var pdp = JSON.parse(localStorage.getItem('datosPGA') || '{}');
    var pga = JSON.parse(localStorage.getItem('datosPDP') || '{}');
    console.log('-------');
    console.log(this.Fases[0]);
    this.Auxiliar = [];

    // Acta
    console.log(
      'acta.casoNegocioValidate', acta.casoNegocioValidate, 'acta.entradactaValidate', acta.entradactaValidate, 'acta.herramientasValidate', acta.herramientasValidate,
      'acta.planValidate', acta.planValidate);

    /**
     * acta: false
      casoNegocioValidate: false
      entradactaValidate: false
      herramientasValidate: false
      planValidate: false
      this.Auxiliar.push(this.Fases[1]);// Caso Negocio
      this.Auxiliar.push(this.Fases[2]);// Acta-PlanGestionBenefi
      this.Auxiliar.push(this.Fases[3]);// PDP-Entrada
     */
    if (acta.acta == false) {
      console.log('1');
      this.Auxiliar.push(this.Fases[0]); // Acta-Entrada
    }
    else {
      console.log('2');
      this.Auxiliar.push(this.Fases[0]); // Acta-Entrada
      this.Auxiliar.push(this.Fases[4]);// Acta-Herramienta
    }
    if (acta.entradactaValidate == true) {
      console.log('3');
      this.Auxiliar.push(this.Fases[1]);// Caso Negocio
      this.Auxiliar.push(this.Fases[2]);// Acta-PlanGestionBenefi
      this.Auxiliar.push(this.Fases[3]);// PDP-Entrada
      this.Auxiliar.push(this.Fases[5]);// PDP-Herramienta
      this.Auxiliar.push(this.Fases[6]);// PGA-Entrada
      this.Auxiliar.push(this.Fases[7]);// PGA-Herraienta

    }
  }

}
