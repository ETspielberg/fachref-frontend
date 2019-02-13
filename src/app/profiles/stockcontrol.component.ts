import {Component, OnDestroy, OnInit} from '@angular/core';
import { Stockcontrol } from '../model/Stockcontrol';
import { StockcontrolService } from "../services/stockcontrol.service";
import { Router } from "@angular/router";
import {HttpClient} from "@angular/common/http";
import * as appGlobals from '../app.globals';
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

@Component({
    selector: 'profiles',
    templateUrl: 'stockcontrol.component.html',
    providers: []
})
export class StockcontrolComponent implements OnInit,OnDestroy {
    stockcontrols : Stockcontrol[];
    timer: any;

    constructor(private stockcontrolService:StockcontrolService, private router : Router,private _http: HttpClient) {
    }

    ngOnInit(): void {
      this.timer = IntervalObservable.create(2000).subscribe(() =>   this.getStockcontrols())
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
      stockcontrol.status = "RUNNING";
        this._http.get(appGlobals.stockanalyzerUrl + "/eventanalyzer/" + stockcontrol.identifier).subscribe();
        setTimeout(this.getStockcontrols(),2000);
    }

    ngOnDestroy() {
      this.timer.unsubscribe();
    }
}
