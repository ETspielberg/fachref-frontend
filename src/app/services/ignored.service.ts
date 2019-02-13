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
        return this.http.get<Ignored[]>(appGlobals.ignoredUrl+ '/all');
    }

    deleteIgnored(identifier: string) {
        return this.http.delete(appGlobals.ignoredUrl + '/ignored/' + identifier, {headers: appGlobals.headers});
    }

    create(ignored: Ignored): Observable<Ignored> {
      console.log("saving ignored:");
      console.log(ignored);
      console.log(JSON.stringify(ignored));
      console.log(ignored.toString());
        return this.http
            .post<Ignored>(appGlobals.ignoredUrl + '/ignored/',
                ignored.toString(),
                {headers: appGlobals.headers});
    }

    update(ignored: Ignored): Observable<Ignored> {
        return this.http
            .patch<Ignored>(appGlobals.ignoredUrl + '/ignored/' + ignored.identifier, JSON.stringify(ignored), {headers: appGlobals.headers});
    }

    get(identifier: string):Observable<Ignored[]> {
      return this.http.get<Ignored[]>(appGlobals.ignoredUrl + '/' + identifier)
    }
}
