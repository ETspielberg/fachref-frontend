export class JournalCollection  {

    constructor(
        public anchor : string,
        public id : number,
        public issns : string,
        public description : string,
        public price : number,
        public type : string,
        public year : number
    ) { }
}