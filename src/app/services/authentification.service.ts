import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Principal} from "../model/Principal";
import {Observable} from "rxjs/Observable";
import * as appGlobals from '../app.globals';

@Injectable()
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  public principal : Principal;

  updatePrincipal() : Observable<Principal> {
    let observable  = this.http.get<Principal>(appGlobals.gatewayurl + '/activeuser');
    observable.subscribe(
      data => this.principal = data
    );
    return observable
  }

  hasRole(role : string) : boolean {
    return this.principal.roles && (this.principal.roles.indexOf("ROLE_" + role.toUpperCase()) > -1);
  }

  logout(): Observable<string> {
    return this.http.post('/logout',{},{responseType: 'text'});
  }
}
