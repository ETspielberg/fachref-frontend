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
              public systemCode: string,
              public materials: string,
              public stockcontrolId: string,
              public shelfmark: string,
              public shelfmarkBase: string,
              public meanRelativeLoan: number,
              public meanStock: number,
              public maxRelativeLoan: number,
              public slope: number,
              public lastStock: number,
              public maxLoansAbs: number,
              public proposedDeletion: number,
              public comment: string,
              public status: string,
              public maxNumberRequest: number,
              public maxItemsNeeded: number,
              public daysRequested: number,
              public numberRequests: number,
              public proposedPurchase: number) {
  }
}
