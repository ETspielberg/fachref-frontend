import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ProfilePerUser} from "../model/ProfilePerUser";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Injectable()
export class ProfilesPerUserService {
    private profilesPerUserUrl : string = appGlobals.settingsUrl + '/profilesperuser';

    constructor (private http: HttpClient) {}

    getProfilePerUsers(identifier : string) : Observable<ProfilePerUser[]> {
        return this.http.get<ProfilePerUser[]>(this.profilesPerUserUrl + '/search/findByIdentifier?identifier=' + identifier).map(data => data['_embedded']['profilesperuser']);
    }

    addProfilePerUsers(profilePerUser :ProfilePerUser) : Observable<ProfilePerUser> {
        return this.http.post<ProfilePerUser>(this.profilesPerUserUrl, JSON.stringify(profilePerUser),{headers: appGlobals.headers});
    }

    deleteProfilePerUsers(identifier: number) {
        const url = this.profilesPerUserUrl + '/' + identifier;
        return this.http.delete(url, {headers: appGlobals.headers});
    }
}
