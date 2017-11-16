import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {JournalCollection} from "../model/JournalCollection";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Injectable()
export class JournalCollectionService {
    private journalcollectionUrl: string = appGlobals.resourcesUrl + '/journalcollection';

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<JournalCollection[]> {
        return this.http.get<JournalCollection[]>(this.journalcollectionUrl);
    }

    deleteJournalcollection(id: number) {
        const url = this.journalcollectionUrl + '/' + id;
        return this.http.delete(url, {headers: appGlobals.headers});
    }

    create(journalCollection: JournalCollection): Observable<JournalCollection> {
        return this.http
            .post<JournalCollection>(this.journalcollectionUrl, JSON.stringify(
                journalCollection),
                {headers: appGlobals.headers});
    }

    update(journalCollection: JournalCollection): Observable<JournalCollection> {
        const url = `${this.journalcollectionUrl}/${journalCollection.id}`;
        return this.http
            .put<JournalCollection>(url, JSON.stringify(journalCollection), {headers: appGlobals.headers});
    }
}
