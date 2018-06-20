export class EbsData  {

  constructor(
    public id : string,
    public title: string,
    public isbn : string,
    public subjectArea : string,
    public doi : string,
    public price : number,
    public year: number,
    public totalUsage : number,
    public pricePerUsage : number,
    public ebsModell : string,
    public selected : boolean
  ) { }
}
