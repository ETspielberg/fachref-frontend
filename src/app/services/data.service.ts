/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { JournalCounter } from '../model/JournalCounter';
import {Observable} from "rxjs/Observable";
import {EbookCounter} from "../model/EbookCounter";
import {Nrequests} from "../model/Nrequests";
import {Eventanalysis} from "../model/Eventanalysis";
import {HttpClient} from "@angular/common/http";
import {DatabaseCounter} from "../model/DatabaseCounter";
import * as appGlobals from '../app.globals';

@Injectable()
export class DataService {
    private journalcounterUrl = appGlobals.dataUrl + '/journalcounter';
    private ebookcounterUrl = appGlobals.dataUrl + '/ebookcounter';
    private databasecounterUrl = appGlobals.dataUrl + '/databasecounter';
    private eventanalysisUrl = appGlobals.dataUrl + "/eventanalysis";
    private nrequestsUrl = appGlobals.dataUrl + "/nrequests";

    constructor (private http: HttpClient) {}

    getAllJournalcounterForIssn(issn : string) : Observable<JournalCounter[]> {
      const url = this.journalcounterUrl + '/getForIssn?issn=' + issn;
      // const url = 'assets/data/example_journalcounter.json';
        return this.http.get<JournalCounter[]>(url);
    }

    getAllJournalcounterForJournalcollection(journalcollection : string) : Observable<JournalCounter[]> {
      const url = this.journalcounterUrl + '/search/findByJournalcollection?onlineIssn=' + journalcollection;
        return this.http.get<JournalCounter[]>(url).map(data => data['_embedded']['journalcounter'])
    }

    getAllEbookcounterForIsbn(isbn : string) : Observable<EbookCounter[]> {
      const url = this.ebookcounterUrl + '/getForIsbn?isbn=' + isbn;
      // const url = 'assets/data/example_ebookcounter.json';
        return this.http.get<EbookCounter[]>(url);
    }

    getAllDatabasecounterForPlatform(platform : string) : Observable<DatabaseCounter[]> {
        return this.http.get<DatabaseCounter[]>(this.databasecounterUrl + '/getForPlatform?platform=' + platform);
    }

    getAllNrequests() : Observable<Nrequests[]> {
        return this.http.get<Nrequests[]>(
            this.nrequestsUrl)
            .map(data => data['_embedded']['nrequests']);
    }

    getAllNRequestsForRange(startNotation : string, endNotation : string) : Observable<Nrequests[]> {
        let url = this.nrequestsUrl + '/search/getNrequestsForNotationgroup?startNotation=' + startNotation + "&endNotation=" + endNotation;
        console.log(url)
        return this.http.get<Nrequests[]>(url)
            .map(data => data['_embedded']['journalcounter']);
    }

    getAllEventanalysisForStockcontrol(stockcontrol : String) : Observable<Eventanalysis[]> {
        return this.http.get<Eventanalysis[]>(
            this.eventanalysisUrl + '/search/findByStockcontrolId?stockcontrolId=' + stockcontrol)
            .map(data => data['_embedded']['eventanalysis']);
    }

    getAllEventanalysisForStockcontrolWiththreshold(stockcontrol : String, threshold : number) : Observable<Eventanalysis[]> {
        return this.http.get<Eventanalysis[]>(
            this.eventanalysisUrl + '/search/findByStockcontrolIdAndProposedDeletionGreaterThanEqual?stockcontrolId=' + stockcontrol+'&proposedDeletion=' + threshold)
            .map(data => data['_embedded']['eventanalysis']);
    }

    updateEventanalysis(eventanalysis: Eventanalysis): Observable<Eventanalysis> {
        const url = `${this.eventanalysisUrl}/${eventanalysis.titleId}`;
        return this.http
            .put<Eventanalysis>(url, JSON.stringify(eventanalysis), {headers: appGlobals.headers});
    }
}
