import { Component, OnInit } from '@angular/core';
import { JournalCounter } from '../model/JournalCounter';
import { Params, ActivatedRoute } from "@angular/router";
import { DataService } from "../services/data.service";
import {Option} from "../model/Option";
import {Datapoint} from "../model/Datapoint";
import {Dataset} from "../model/Dataset";

@Component({
    selector: 'journalcounter',
    templateUrl: 'journalcounter.component.html',
    providers: []
})

export class JournalcounterComponent implements OnInit {

    journalcounters : Map<string,JournalCounter[]>;

    private plotData : Map<string,Datapoint[]>;

    private options : Option;

    issnsString : string;

    private issns : string[];

    constructor(private dataService :DataService,
                private route : ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params : Params) => this.issnsString = params['onlineIssn']);
        this.getJournalCounters();
    }

    getJournalCounters() {
        if (this.issnsString != null) {
            this.issns = this.issnsString.split(" ");
            for (let issn of this.issns) {
                this.dataService.getAllJournalcounterForIssn(issn).subscribe(
                    data => this.journalcounters[issn] = data
                );
            }
        }
    }

    updatePlotData() {
        this.options = new Option({text:""},[],
            {title: {text: 'Anzahl'},min : 0, allowDecimals : false},
            {type: 'datetime'},
            {defaultSeriesType : 'line',zoomType : 'xy'},
            ['#AA4643', '#4572A7', '#89A54E', '#80699B',
                '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92' ]);
        this.options.lang = {
            months : [ 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                'Juli', 'August', 'September', 'Oktober', 'November',
                'Dezember' ]};
        this.plotData = new Map<string,Datapoint[]>();
       this.updateChartObject();
    }

    updateChartObject() {
        for (let key in this.plotData) {
            let datapoints = this.plotData[key];
            datapoints.push(new Datapoint(new Date().getTime(), datapoints[datapoints.length-1][1]));
            let dataset : Dataset = new Dataset(key,datapoints);
            this.options.series.push(dataset);
        }
    }
}
