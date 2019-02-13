/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';
import {Counter} from "../model/Counter";

@Injectable()
export class DataService {
    private journalcounterUrl = appGlobals.counterretrievalUrl + '/journalcounter';
    private ebookcounterUrl = appGlobals.counterretrievalUrl + '/ebookcounter';
    private databasecounterUrl = appGlobals.counterretrievalUrl + '/databasecounter';

    constructor (private http: HttpClient) {}

    getAllCounterForIdentifier(identifier : string, typeOfIdentifier: string) : Observable<Counter[]> {
      let url;
      if (typeOfIdentifier == 'journal') {
        url = this.journalcounterUrl + '/getForIssn?issn=' + identifier;
        // url = 'assets/data/example_journalcounter.json'
      } else if (typeOfIdentifier == 'ebook') {
        url = this.ebookcounterUrl + '/getForIsbn?isbn=' + identifier;
      } else if (typeOfIdentifier == 'database') {
        url = this.databasecounterUrl + '/getForPlatform?platform=' + identifier;
      } else if (typeOfIdentifier == 'publisher') {
        url = this.journalcounterUrl + '/journal' + typeOfIdentifier + 'counter/getForPublisher?publisher=' + identifier;
      } else if (typeOfIdentifier == 'platform') {
        url = this.journalcounterUrl + '/journal' + typeOfIdentifier + 'counter/getForPlatform?platform=' + identifier;
      }
      return this.http.get<Counter[]>(url);
    }
}
