import { ControlFase_02DTO } from "./ControlFase_02DTO";

export class ControlFase_01DTO {
    public idproyecto !: number;
    public nombre !: string;
    public descripcion!: string;
    public admin!: string;
    public tipo_id!:string;     

    public reuniones !: Array<ControlFase_02DTO>;
    constructor(

    ) {

    }
}