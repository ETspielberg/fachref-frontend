/**
 * Created by etspi on 22.06.2017.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Usersettings } from '../model/Usersettings';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Injectable()
export class UserService {

    private usersettingsUrl : string = appGlobals.settingsUrl + '/usersettings';

    public usersettings: Usersettings;

    constructor (private http: HttpClient) {}


    get(name : String) : Observable<Usersettings> {
        const url = `${this.usersettingsUrl}/${name}`;
        return this.http.get<Usersettings>(url);
    }

    create(usersettings : Usersettings): Observable<Usersettings> {
        return this.http
            .post<Usersettings>(this.usersettingsUrl, JSON.stringify(usersettings),{headers: appGlobals.headers});
    }

    getAll() : Observable<Usersettings[]> {
        return this.http.get<Usersettings[]>(this.usersettingsUrl);
    }
}
