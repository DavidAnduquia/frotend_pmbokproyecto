
export class CrearfaseConResponsablesDTO {

    constructor(


        public idproyecto: number,
        public idtipofase: number,
        public descripcionfase: String,
        public idresponsable: Array<any>,
        public tiempoinicio: String,
        public tiempofin: String,
        public nombrereunion: String,
        public descripcionreunion: String

    ) {

    }
}