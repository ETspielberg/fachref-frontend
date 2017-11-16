export class JournalTitle  {

    constructor(
        public name : string,
        public id : number,
        public issn : string,
        public zdbID : string,
        public snip : number,
        public type : string,
        public year : number,
        public subject : string,
        public priceCalculated : number,
        public price : number
    ) { }
}