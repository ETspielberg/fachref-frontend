import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {JournalTitle} from "../model/JournalTitle";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Injectable()
export class JournalTitleService {
    private journaltitlenUrl: string = appGlobals.resourcesUrl + '/journaltitle';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<JournalTitle[]> {
        return this.http.get<JournalTitle[]>(this.journaltitlenUrl);
    }

    deleteJournaltitle(id: number) {
        const url = this.journaltitlenUrl + '/' + id;
        return this.http.delete(url, {headers: appGlobals.headers});
    }

    create(journalTitle: JournalTitle): Observable<JournalTitle> {
        return this.http
            .post<JournalTitle>(this.journaltitlenUrl, JSON.stringify(
                journalTitle),
                {headers: appGlobals.headers});
    }

    update(journalTitle: JournalTitle): Observable<JournalTitle> {
        const url = `${this.journaltitlenUrl}/${journalTitle.id}`;
        return this.http
            .put<JournalTitle>(url, JSON.stringify(journalTitle), {headers: appGlobals.headers});
    }
}
