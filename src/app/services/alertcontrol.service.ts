/**
 * Created by Eike on 26.06.2017.
 */

import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Alertcontrol } from '../model/Alertcontrol';
import {Observable} from "rxjs/Observable";
import {ProfilePerUser} from "../model/ProfilePerUser";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';
import {AuthentificationService} from "./authentification.service";

@Injectable()
export class AlertcontrolService {
    private alertcontrolUrl : string = appGlobals.stockanalyzerUrl + '/alertcontrol';
    private profilePerUserUrl : string = appGlobals.stockanalyzerUrl + '/profilesperuser';
    private username : string;

    constructor (private http: HttpClient, private authentificationService : AuthentificationService) {}

    getAll() : Observable<Alertcontrol[]> {
        return this.http.get<Alertcontrol[]>(this.alertcontrolUrl);
    }

    getAllForUsername() : Observable<Alertcontrol[]> {
        this.username = this.authentificationService.principal.name;
        return this.http.get<Alertcontrol[]>(this.alertcontrolUrl + '/search/findByUsername?username=' + this.username)
            .map(response => response['_embedded']['alertcontrol']);
    }

    getAlertcontrol(identifier : String) : Observable<Alertcontrol> {
        const url = `${this.alertcontrolUrl}/${identifier}`;
        console.log('querying url ' + url);
        return this.http.get<Alertcontrol>(url);
    }

    deleteAlertcontrol(identifier: string) {
        return this.http.delete(this.alertcontrolUrl + '/' + identifier, {headers: appGlobals.headers});
    }

    create(alertcontrol: Alertcontrol): Observable<Alertcontrol> {
        alertcontrol.identifier = alertcontrol.notationgroup + '_' + Date.now();
        const profilePerUser : ProfilePerUser = new ProfilePerUser(alertcontrol.identifier,this.authentificationService.principal.name);
        let response : Observable<Alertcontrol> =  this.http
            .post<Alertcontrol>(this.alertcontrolUrl, JSON.stringify(
                alertcontrol),
                {headers: appGlobals.headers});
        this.http
            .post<ProfilePerUser>(this.profilePerUserUrl, JSON.stringify(
                profilePerUser),
                {headers: appGlobals.headers})
            .toPromise().then(
            data => console.log("saved stockcontrolUser" + data)
        );
        return response;
    }

    update(alertcontrol: Alertcontrol): Observable<Alertcontrol> {
        const url = `${this.alertcontrolUrl}/${alertcontrol.identifier}`;
        return this.http
            .put<Alertcontrol>(url, JSON.stringify(alertcontrol), {headers: appGlobals.headers});
    }
}
