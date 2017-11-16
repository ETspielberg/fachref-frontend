export class Sushiprovider  {

    constructor(
        public identifier : string,
        public status : string,
        public name : string,
        public sushiURL : string,
        public sushiRequestorID : string,
        public sushiRequestorName : string,
        public sushiRequestorEmail : string,
        public sushiCustomerReferenceID : string,
        public sushiCustomerReferenceName : string,
        public sushiRelease : number,
        public lastrun ?: string
    ) { }
}