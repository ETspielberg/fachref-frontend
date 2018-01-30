/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { Eventanalysis } from '../model/Eventanalysis';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Injectable()
export class EventanalysisService {
    private eventanalysisUrl : string = appGlobals.dataUrl + '/eventanalysis';

    constructor (private http: HttpClient) {}


    getAllForStockcontrol(stockcontrol : String) : Observable<Eventanalysis[]> {
        return this.http.get<Eventanalysis[]>(
            this.eventanalysisUrl + '/search/findByStockcontrolId?stockcontrolId=' + stockcontrol)
            .map(data => data['_embedded']['eventanalysis']);
    }

    getAllForStockcontrolWiththreshold(stockcontrol : String, threshold : number) : Observable<Eventanalysis[]> {
        return this.http.get<Eventanalysis[]>(
            this.eventanalysisUrl + '/search/findByStockcontrolIdAndProposedDeletionGreaterThanEqual?stockcontrolId=' + stockcontrol+'&proposedDeletion=' + threshold)
            .map(data => data['_embedded']['eventanalysis']);
    }

    update(eventanalysis: Eventanalysis): Observable<Eventanalysis> {
        const url = `${this.eventanalysisUrl}/${eventanalysis.identifier}`;
        const headers = appGlobals.headers.set('X-Requested-With','XMLHttpRequest');
        let eaString = JSON.stringify(eventanalysis);
        return this.http
            .put<Eventanalysis>(url, eaString, {headers: headers});
    }
}
