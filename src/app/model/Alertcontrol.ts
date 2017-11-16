/**
 * Created by etspi on 25.06.2017.
 */

export class Alertcontrol  {

    constructor(
        public identifier : string,
        public description : string,
        public notationgroup : string,
        public thresholdRatio : number,
        public thresholdRequests : number,
        public thresholdDuration : number,
        public timeperiod : number
) { }
}