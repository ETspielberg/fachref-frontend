import { Component, OnInit } from '@angular/core';
import { Eventanalysis } from '../model/Eventanalysis';
import { EventanalysisService } from "../services/eventanalysis.service";
import { IgnoredService } from "../services/ignored.service"
import { Router, Params, ActivatedRoute } from "@angular/router";
import { Ignored } from "../model/Ignored";
import { StockcontrolService } from "../services/stockcontrol.service";
import { Stockcontrol } from "../model/Stockcontrol";
import {DataTable} from "primeng/primeng";

@Component({
    selector: 'eventanalysis',
    templateUrl: 'eventanalysis.component.html',
    providers: []
})

export class EventanalysisComponent implements OnInit {

    stockcontrol : Stockcontrol;

    private eventanalyses : Eventanalysis[];

    sortedEventanalysis : Map<string,Eventanalysis[]>;

    ignored : Ignored;

    display : boolean;

    private identifier : string;

    private busy : Promise<any>;

    listOptions : object[];

    selectedList : string;

    showAllAnalyses : boolean;

    private threshold : number;

    constructor(private eventanalysisService:EventanalysisService,
                private router : Router,
                private route : ActivatedRoute,
                private ignoredService : IgnoredService,
                private stockcontrolService : StockcontrolService) {
    }

    ngOnInit(): void {
        this.showAllAnalyses = false;
        this.threshold = 1;
        this.eventanalyses = [];
        this.listOptions = [];
        this.route.params.subscribe((params : Params) => this.identifier = params['identifier']);
        this.sortedEventanalysis = new Map<string,Eventanalysis[]>();
        this.resetIgnored();
        this.stockcontrolService.getStockcontrol(this.identifier).map(
            stockcontrol => this.stockcontrol = stockcontrol);
        this.busy = this.eventanalysisService.getAllForStockcontrolWiththreshold(this.identifier,this.threshold).toPromise().then(
            eventanalyses => this.eventanalyses = eventanalyses);
        this.busy.then(
            eventanalyses => this.sortEventanalyses()
        );
        this.selectedList = 'proposed';
    }

    reloadAllAnalyses() {
        this.busy = this.eventanalysisService.getAllForStockcontrol(this.identifier).toPromise().then(
            eventanalyses => this.eventanalyses = eventanalyses);
        this.busy.then(
            eventanalyses => this.sortEventanalyses()
        );
    }

    sortEventanalyses() {
        this.listOptions = [];
        let allOptions = new Set<string>();
        this.sortedEventanalysis = new Map<string,Eventanalysis[]>();
        for (let eventanalysis of this.eventanalyses) {
            if (eventanalysis.proposedDeletion == 0 && !this.showAllAnalyses) {
                continue;
            }
            let eventanalysesInd : Eventanalysis[] = [];
            let category = eventanalysis.status;
            if (allOptions.has(category)) {
                eventanalysesInd = this.sortedEventanalysis[eventanalysis.status];
            } else {
                allOptions.add(category);
            }
            eventanalysesInd.push(eventanalysis);
            this.sortedEventanalysis[eventanalysis.status] = eventanalysesInd;
        }
        let listOptions = Array.from(allOptions);
        for (let listOption of listOptions) {
            let entry : object = {label : listOption, value : listOption};
            this.listOptions.push(entry);
        }
    }

    showDialog(eventanalysis : Eventanalysis) {
        this.display = true;
        this.transferInformation(eventanalysis);
        this.ignored.type = 'deletion'
        eventanalysis.status = 'ignored';
    }

    resetIgnored() {
        const date : Date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        this.ignored = new Ignored("","","","","","",new Date(), new Date(year+2,month,day));
    }

    toBlacklistStandard(eventanalysis : Eventanalysis) : void {
        this.resetIgnored();
        this.transferInformation(eventanalysis);
        //this.ignoredService.create(this.ignored);
        eventanalysis.status = 'ignored';
        this.saveIgnored();
    }

    transferInformation(eventanalysis : Eventanalysis) {
        this.ignored.shelfmark = eventanalysis.shelfmark;
        this.ignored.identifier = this.stockcontrol.identifier;
        this.ignored.titleId = eventanalysis.titleId;
        this.ignored.mab = eventanalysis.mab;
    }

    saveIgnored() {
        console.log(this.ignored);
        this.display = false;
        this.sortEventanalyses();
    }

    delete(eventanalysis : Eventanalysis) {
        eventanalysis.status = 'deletion';
        this.sortEventanalyses();
    }

    toRepository(eventanalysis : Eventanalysis) {
        eventanalysis.status = 'repository';
        this.sortEventanalyses();
    }

    toBlacklist(eventanalysis : Eventanalysis) {
        eventanalysis.status = 'ignored';
        this.sortEventanalyses();
    }

    toProposal(eventanalysis : Eventanalysis) {
        eventanalysis.status = 'proposed';
        this.sortEventanalyses();
    }

    saveStatus() {
        for (let eventanalysis of this.eventanalyses) {
            this.eventanalysisService.update(eventanalysis);
        }
    }
}
