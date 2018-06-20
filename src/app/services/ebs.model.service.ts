import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {EbsModel} from "../model/EbsModel";

import * as appGlobals from '../app.globals';
import {EbsData} from "../model/EbsData";
import {headers} from "../app.globals";

@Injectable()
export class EbsModelService{
  private ebsModelUrl = appGlobals.settingsUrl + '/ebsModel';

  constructor (private http: HttpClient) {}

  getAll() : Observable<EbsModel[]> {
    return this.http.get<EbsModel[]>(this.ebsModelUrl + '/search/getAll').map(data => data['_embedded']['ebsModel']);
  }


}

