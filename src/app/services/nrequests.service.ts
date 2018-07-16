import {Injectable} from "@angular/core";
import {Nrequests} from "../model/Nrequests";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Injectable()
export class NrequestsService {
    private nrequestsUrl : string = appGlobals.dataUrl + '/nrequests';

    constructor (private http: HttpClient) {}

    getAll() : Observable<Nrequests[]> {
        return this.http.get<Nrequests[]>(this.nrequestsUrl);
    }

    getAllForRange(startNotation : string, endNotation : string, timeperiod: number) : Observable<Nrequests[]> {
        let url = this.nrequestsUrl + '/getForTimeperiod?startNotation=' + startNotation + "&endNotation=" + endNotation + '&timeperiod=' + String(timeperiod);
        return this.http.get<Nrequests[]>(url).map(data => data['_embedded']['nrequests']);
    }
}
