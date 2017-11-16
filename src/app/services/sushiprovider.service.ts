/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import {Sushiprovider} from "../model/Sushiprovider";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Injectable()
export class SushiproviderService {
    private sushiproviderUrl : string = appGlobals.settingsUrl + '/sushiprovider';

    constructor (private http: HttpClient) {}

    getAll() : Observable<Sushiprovider[]> {
        return this.http.get<Sushiprovider[]>(this.sushiproviderUrl);
    }

    getSushiprovider(identifier : String) : Observable<Sushiprovider> {
        const url = `${this.sushiproviderUrl}/${identifier}`;
        return this.http.get<Sushiprovider>(url);
    }

    deleteSushiprovider(identifier: string) {
        const url = this.sushiproviderUrl + '/' + identifier;
        return this.http.delete(url, {headers: appGlobals.headers});
    }

    create(sushiprovider: Sushiprovider): Observable<Sushiprovider> {
        return this.http
            .post<Sushiprovider>(this.sushiproviderUrl, JSON.stringify(
                sushiprovider),
                {headers: appGlobals.headers});
    }

    update(sushiprovider: Sushiprovider): Observable<Sushiprovider> {
        const url = `${this.sushiproviderUrl}/${sushiprovider.identifier}`;
        return this.http
            .put<Sushiprovider>(url, JSON.stringify(sushiprovider), {headers: appGlobals.headers});
    }
}
