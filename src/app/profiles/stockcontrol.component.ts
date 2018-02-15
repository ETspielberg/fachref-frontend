import { Component, OnInit } from '@angular/core';
import { Stockcontrol } from '../model/Stockcontrol';
import { StockcontrolService } from "../services/stockcontrol.service";
import { Router } from "@angular/router";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';

@Component({
    selector: 'profiles',
    templateUrl: 'stockcontrol.component.html',
    providers: []
})
export class StockcontrolComponent implements OnInit {
    stockcontrols : Stockcontrol[];

    constructor(private stockcontrolService:StockcontrolService, private router : Router,private _http: HttpClient) {
    }

    ngOnInit(): void {
        this.getStockcontrols();
    }

    getStockcontrols() {
        this.stockcontrolService.getAllForUsername().subscribe(
            data=> this.stockcontrols = data
        );
    }

    deleteStockcontrol(stockcontrol : Stockcontrol):void {
        this.stockcontrolService.deleteStockcontrol(stockcontrol.identifier).subscribe(() => {
            this.stockcontrols = this.stockcontrols.filter(sc => sc != stockcontrol);
        });
        this.router.navigate(['/profiles']);
    }

    runStockcontrol(stockcontrol : Stockcontrol) : void {
        this._http.get(appGlobals.batchUrl + "/eventanalyzer?identifier=" + stockcontrol.identifier).subscribe();
    }

}
