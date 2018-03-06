/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Ignored} from "../model/Ignored";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Injectable()
export class IgnoredService {

    constructor (private http: HttpClient) {}

    getAll() : Observable<Ignored[]> {
        return this.http.get<Ignored[]>(appGlobals.ignoredUrl);
    }

    deleteIgnored(identifier: string) {
        return this.http.delete(appGlobals.ignoredUrl + '/' + identifier, {headers: appGlobals.headers});
    }

    create(ignored: Ignored): Observable<Ignored> {
        return this.http
            .post<Ignored>(appGlobals.ignoredUrl, JSON.stringify(
                ignored),
                {headers: appGlobals.headers});
    }

    update(ignored: Ignored): Observable<Ignored> {
        return this.http
            .put<Ignored>(appGlobals.ignoredUrl + '/' + ignored.identifier, JSON.stringify(ignored), {headers: appGlobals.headers});
    }

    get(identifier: string):Observable<Ignored> {
      return this.http.get<Ignored>(appGlobals.ignoredUrl + '/' + identifier)
    }
}
