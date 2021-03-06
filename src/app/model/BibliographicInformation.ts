/**
 * Created by Eike on 17.07.2017.
 */

export class BibliographicInformation {

    constructor(
      public docNumber : string,
        public isbn : string,
      public doi : string,
      public authors : string[],
      public title : string,
      public subtitle : string,
      public publisher : string,
      public place : string,
      public year : string,
      public edition : string,
      public series : string,
      public volume : number,
      public keywords : string[],
      public type : string
    ) {}
}
