import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {EbsData} from "../model/EbsData";
import * as appGlobals from "../app.globals";

@Injectable()
export class EbsDataService{
  private ebsDataUrl = appGlobals.dataUrl + '/ebsData';

  constructor (private http: HttpClient) {}

  getForEbsModel(ebsModel: string) : Observable<EbsData[]> {
    return this.http.get<EbsData[]>(this.ebsDataUrl + '/getForEbsModel?ebsModel=' + ebsModel);
  }

  updateSelectionEbsData(ebsData: EbsData) {
    const url = this.ebsDataUrl + '/' + ebsData.id;
    return this.http.patch(url, JSON.stringify({'selected': ebsData.selected}),{headers: appGlobals.headers})
  }
}

