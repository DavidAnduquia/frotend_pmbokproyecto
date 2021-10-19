export class PlanGestioBeneficio{

    constructor(
        public id_plan_gb:number,
        public idEntradaActa:number,
        public acciones:string,
        public componentes:string,
        public prodcutos:string,
        public servicios:string,
        public resultado:string,
        public estado:boolean,
        public participa:String,
      
    ){

    }
}