import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {SushiproviderService} from "../services/sushiprovider.service";
import {Sushiprovider} from "../model/Sushiprovider";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Component({
    selector: 'sushi',
    templateUrl: 'sushi.component.html',
    providers: [SushiproviderService]
})
export class SushiComponent implements OnInit {
    sushiproviders: Sushiprovider[];

    reportTypes = [
        {value : "JR1", label : "Journal Report 1"},
        {value : "BR1", label : "Book Report 1"},
        {value : "BR2", label : "Book Report 2"},
        {value : "PR1", label : "Plattform Report 1"}
        ];

    private selectedReport: string;

    constructor(private sushiproviderService: SushiproviderService, private router: Router, private http: HttpClient) {
    }

    ngOnInit(): void {
        this.getSushiproviders();
    }

    getSushiproviders() {
        this.sushiproviderService.getAll().subscribe(
            data => this.sushiproviders = data.filter(sc => sc.identifier != 'newSushiprovider')
        );
    }

    deleteSushiprovider(sushiprovider: Sushiprovider): void {
        this.sushiproviderService.deleteSushiprovider(sushiprovider.identifier).subscribe(() => {
            this.sushiproviders = this.sushiproviders.filter(sc => sc != sushiprovider);
        });
        this.router.navigate(['/media/sushi']);
    }

    collectSushiData(sushiprovider: Sushiprovider): void {
        this.http.get(appGlobals.batchUrl + "/sushi?identifier=" + sushiprovider.identifier + "&type=" + this.selectedReport + "&mode=initialize").subscribe(
            res => console.log(res)
        );
    }
}
