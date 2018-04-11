/**
 * Created by etspi on 25.06.2017.
 */

export class Eventanalysis {

  constructor(public identifier: string,
              public titleId: string,
              public mab: string,
              public description: string,
              public date: Date,
              public collection: string,
              public materials: string,
              public shelfmark: string,
              public shelfmarkBase: string,
              public meanRelativeLoan: number,
              public slope: number,
              public lastStock: number,
              public maxLoansAbs: number,
              public proposedDeletion: number,
              public comment: string,
              public status: string) {
  }
}
