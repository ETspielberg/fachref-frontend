export class Nrequests  {

    constructor (
        public titleId : string,
        public shelfmark : string,
        public mab : string,
        public ratio : number,
        public totalDuration : number,
        public NRequests : number,
        public NLoans : number,
        public NItems : number,
        public NLendable : number,
        public date : Date
    ) { }
}