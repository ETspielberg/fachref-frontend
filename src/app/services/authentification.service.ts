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

  login(username: string, password: string) : Observable<Principal> {
    let token : string = "Basic " + btoa(username + ":" + password);
    const headers = new HttpHeaders().set('Authorization',token);
    let observable  = this.http.get<Principal>('http://localhost:8080/activeuser',{headers : headers});
      observable.subscribe(
      data => this.principal = data
    );
    return observable;
  }

  logout() : Observable<object> {
    return this.http.post("/logout", appGlobals.headers);
  }

  updatePrincipal() : Observable<Principal> {
    let observable  = this.http.get<Principal>('http://localhost:8080/activeuser');
    observable.subscribe(
      data => this.principal = data
    );
    return observable
  }


  hasRole(role : string) : boolean {
    return this.principal.roles && (this.principal.roles.indexOf("ROLE_" + role.toUpperCase()) > -1);
  }
}
