/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import { Stockcontrol } from '../model/Stockcontrol';
import 'rxjs/add/operator/toPromise';
import {UserService} from "./user.service";
import {Observable} from "rxjs/Observable";
import {ProfilePerUser} from "../model/ProfilePerUser";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';
import {AuthentificationService} from "./authentification.service";

@Injectable()
export class StockcontrolService {
    private stockcontrolUrl : string = appGlobals.settingsUrl + '/stockcontrol';
    private profilePerUserUrl : string = appGlobals.settingsUrl + 'http://localhost:11300/profilesperuser';
    private username : string;

    constructor (private http: HttpClient, private authentificationService : AuthentificationService) {}

    getAll() : Observable<Stockcontrol[]> {
        return this.http.get<Stockcontrol[]>(this.stockcontrolUrl);
    }

    getAllForUsername() : Observable<Stockcontrol[]> {
        this.username = this.authentificationService.principal.name;
        return this.http.get<Stockcontrol[]>(this.stockcontrolUrl + '/search/findByUsername?username=' + this.username)
            .map(response => response['_embedded']['stockcontrol']);
    }

    getStockcontrol(identifier : String) : Observable<Stockcontrol> {
        const url = `${this.stockcontrolUrl}/${identifier}`;
        return this.http.get<Stockcontrol>(url);
    }

    deleteStockcontrol(identifier: string) {
        const url = this.stockcontrolUrl + '/' + identifier;
        return this.http.delete(url, {headers: appGlobals.headers});
    }

    create(stockcontrol: Stockcontrol): Observable<Stockcontrol> {
        stockcontrol.identifier = stockcontrol.subjectID + '_' + Date.now();
        /* const profilePerUser : ProfilePerUser = new ProfilePerUser(stockcontrol.identifier,this.authentificationService.principal.name);
        this.http
            .post<ProfilePerUser>(this.profilePerUserUrl, JSON.stringify(
                profilePerUser),
                {headers: appGlobals.headers}).subscribe(); */
        return this.http
            .post<Stockcontrol>(this.stockcontrolUrl, JSON.stringify(
                stockcontrol),
                {headers: appGlobals.headers});
    }

    update(stockcontrol: Stockcontrol): Observable<Stockcontrol> {
        const url = `${this.stockcontrolUrl}/${stockcontrol.identifier}`;
        return this.http
            .put<Stockcontrol>(url, JSON.stringify(stockcontrol), {headers: appGlobals.headers});
    }
}
