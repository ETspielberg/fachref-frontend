export class EbsModel {

  constructor(
    public id : string,
    public publisher: string,
    public issns : string[],
    public startOfEbs : Date,
    public endOfEbs: Date,
    public description : string,
    public priceLimit: number
  ) { }
}
