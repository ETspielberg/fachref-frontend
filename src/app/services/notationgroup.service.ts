/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Notationgroup} from "../model/Notationgroup";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Injectable()
export class NotationgroupService {
    private notationgroupUrl : string = appGlobals.settingsUrl + '/notationgroup';

    constructor (private http: HttpClient) {}

    getAll() : Observable<Notationgroup[]> {
        return this.http.get<Notationgroup[]>(this.notationgroupUrl);
    }

    get(identifier : String) : Observable<Notationgroup> {
        const url = this.notationgroupUrl + '/' + identifier;
        return this.http.get<Notationgroup>(url);
    }

    deleteNotationgroup(identifier: string) {
        const url = this.notationgroupUrl + '/' + identifier;
        return this.http.delete(url, {headers: appGlobals.headers});
    }

    create(notationgroup: Notationgroup): Observable<Notationgroup> {
        return this.http
            .post<Notationgroup>(this.notationgroupUrl, JSON.stringify(
                notationgroup),
                {headers: appGlobals.headers});
    }

    update(notationgroup: Notationgroup): Observable<Notationgroup> {
        const url = this.notationgroupUrl + '/' + notationgroup.notationgroupName;
        return this.http
            .put<Notationgroup>(url, JSON.stringify(notationgroup), {headers: appGlobals.headers});
    }
}
