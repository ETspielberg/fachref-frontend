import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Journal} from "../model/Journal";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Injectable()
export class JournalService {
    private journalUrl: string = appGlobals.resourcesUrl + '/journal';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Journal[]> {
        return this.http.get<Journal[]>(this.journalUrl);
    }

    deleteJournal(id: number) {
        const url = this.journalUrl + '/' + id;
        return this.http.delete(url, {headers: appGlobals.headers});
    }

    create(journal: Journal): Observable<Journal> {
        return this.http
            .post<Journal>(this.journalUrl, JSON.stringify(
                journal),
                {headers: appGlobals.headers});
    }

    update(journal: Journal): Observable<Journal> {
        const url = `${this.journalUrl}/${journal.id}`;
        return this.http
            .put<Journal>(url, JSON.stringify(journal), {headers: appGlobals.headers});
    }
}
