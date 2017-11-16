export class Journal  {

    constructor(
        public actualName : string,
        public id : number,
        public issns : string,
        public description : string,
        public zdbID : string,
        public ezbID : string,
        public link : string,
        public subject : string,
        public publisher : string
    ) { }
}