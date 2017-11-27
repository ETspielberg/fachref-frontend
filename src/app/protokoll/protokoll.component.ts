import { Component, OnInit } from '@angular/core';
import {ProtokollRequest} from "../model/ProtokollRequest";
import {Manifestation} from "../model/Manifestation";
import {GetterService} from "../services/getter.service";
import {DataTable} from "primeng/primeng";
import {Item} from "../model/Item";
import {Event} from "../model/Event";

import {ActivatedRoute} from '@angular/router';
import {Option} from "../model/Option";
import {Dataset} from "../model/Dataset";
import {Datapoint} from "../model/Datapoint";

@Component({
    selector: 'profiles',
    templateUrl: 'protokoll.component.html',
    providers: [GetterService]
})

export class ProtokollComponent implements OnInit{

    constructor(private getterService : GetterService, private route:ActivatedRoute) {
    }

    busy: boolean;

    manifestations : Manifestation[];

    private options : Option;

    private filterList : Map<string,boolean>;

    private filteredItems : Map<string,Item[]>;

    private filteredEvents : Map<string,Event[]>;

    private filteredManifestations : Map<string,Manifestation>;

    private plotData : Map<string,Datapoint[]>;

    private uniqueCollections : string[];

    private uniqueMaterials : string[];

    protokollRequest : ProtokollRequest;

    private selectedManifestations : Manifestation[];

    private selectedEvents : Event[];

    private selectedItems : Item[];

    private showUsergroups : boolean;

    manifestationsFound : boolean;

    ngOnInit(): void {
        this.resetVariables();
        let shelfmarkFromRequest : string = "";
        let collectionsFromRequest : string = "";
        let materialsFromRequest : string = "";
        this.route.queryParams.subscribe( params =>
            shelfmarkFromRequest = params['shelfmark']);
        this.route.queryParams.subscribe( params =>
            collectionsFromRequest = params['collections']);
        this.route.queryParams.subscribe( params =>
            materialsFromRequest = params['materials'], params => materialsFromRequest = '');
        console.log(shelfmarkFromRequest);
        if (!(typeof shelfmarkFromRequest === 'undefined' || shelfmarkFromRequest == '')) {
            this.protokollRequest.shelfmark = shelfmarkFromRequest;
        }
        if (!(typeof collectionsFromRequest === 'undefined' || collectionsFromRequest == '')) {
            this.protokollRequest.collections = collectionsFromRequest;
        }
        if (!(typeof materialsFromRequest === 'undefined' || materialsFromRequest == '')) {
            this.protokollRequest.materials = materialsFromRequest;
        }
        if (this.protokollRequest.shelfmark != '') {
            this.getFullManifestations();
        }
    }

    resetVariables() {
        this.filteredManifestations = new Map<string,Manifestation>();
        this.filteredItems = new Map<string,Item[]>();
        this.filteredEvents = new Map<string,Event[]>();
        this.selectedManifestations = [];
        this.selectedItems = [];
        this.selectedEvents = [];
        this.protokollRequest  = new ProtokollRequest("","","",false);
        this.manifestationsFound = false;
        this.filterList = new Map<string,boolean>();
    }

    getFullManifestations() {
        this.manifestations = [];
        this.busy = true;
        this.getterService.getFullManifestation(this.protokollRequest).subscribe(
          data => {
            this.manifestations = data;
            this.initializeLists();
          }
        );
    }

    initializeLists() {
        if (this.manifestations.length > 0) {
            this.manifestationsFound = true;
        }
        let uniqueCollections = new Set<string>();
        let uniqueMaterials = new Set<string>();

        for (let manifestation of this.manifestations) {
            this.filterList[manifestation.titleID] = true;
            this.selectedManifestations.push(manifestation);
            for (let collection of manifestation.collections) {
                if (!uniqueCollections.has(collection)) {
                    uniqueCollections.add(collection);
                    this.filterList[collection] = true;
                }
            }
            for (let material of manifestation.materials) {
                if (!uniqueMaterials.has(material)) {
                    uniqueMaterials.add(material);
                    this.filterList[material] = true;
                }
            }
        }
        this.includeSelectionFromHttpParamters();
        this.uniqueMaterials = Array.from(uniqueMaterials).sort();
        this.uniqueCollections = Array.from(uniqueCollections).sort();
        this.update();
    }

    includeSelectionFromHttpParamters() {
        if (!(typeof this.protokollRequest.collections === 'undefined' || this.protokollRequest.collections.trim() == '' )) {
            console.log(this.protokollRequest.collections);
            let individualCollections : string[] = [];
            if (this.protokollRequest.collections.indexOf(' ') > -1)
                individualCollections = this.protokollRequest.collections.split(' ');
            else
                individualCollections.push(this.protokollRequest.collections);
            for (let f of this.uniqueCollections) {
                let fitting : boolean = false;
                for (let m of individualCollections) {
                    if (f.startsWith(m.trim())) {
                        fitting = true;
                    }
                }
                this.filterList[f] = fitting;
            }
        }
    }

    update() {
        this.updateFilteredLists();
        this.updatePlotData();
      this.busy = false;
    }

    updateFilteredLists() {
        this.filteredManifestations = new Map<string,Manifestation>();
        this.filteredItems = new Map<string,Item[]>();
        this.filteredEvents = new Map<string,Event[]>();
        this.selectedManifestations = [];
        this.selectedItems = [];
        this.selectedEvents = [];
        for(let m of this.manifestations) {
            if (this.filterList[m.titleID]) {
                this.selectedManifestations.push(m);
                this.filteredManifestations[m.titleID] = m;
                let filteredItemsInd: Item[] = [];
                let filteredEventsInd: Event[] = [];
                for (let item of m.items) {
                    if (this.filterList[item.collection] && this.filterList[item.material]) {
                        filteredItemsInd.push(item);
                        this.selectedItems.push(item);
                        for (let event of item.events) {
                            filteredEventsInd.push(event);
                            this.selectedEvents.push(event);
                            if (event.endEvent != null) {
                                this.selectedEvents.push(event.endEvent);
                            }
                        }
                    }
                }
                this.filteredItems[m.titleID] = filteredItemsInd;
                this.filteredEvents[m.titleID] = filteredEventsInd;
            }
        }
        this.selectedEvents.sort(function(firstEvent, secondEvent){
            return firstEvent.time == secondEvent.time ? 0 : +(firstEvent.time > secondEvent.time) || -1;
        });
    }

    updatePlotData() {
        this.options = new Option({text:""},[],
            {title: {text: 'Anzahl'},min : 0, allowDecimals : false},
            {type: 'datetime'},
            {defaultSeriesType : 'line',zoomType : 'xy'},
            ['#AA4643', '#4572A7', '#89A54E', '#80699B',
                '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92' ]);
        this.plotData = new Map<string,Datapoint[]>();
        for (let event of this.selectedEvents) {
            if (this.showUsergroups) {
                this.addDatapoint(event, event.borrowerStatus);
            } else {
                if (event.type == 'loan' || event.type == 'return') {
                    this.addDatapoint(event, 'loans');
                } else if (event.type == 'request' || event.type == 'hold') {
                    this.addDatapoint(event, 'requests');
                } else if (event.type == 'inventory' || event.type == 'deletion') {
                    this.addDatapoint(event, 'stock');
                } else if (event.type == 'cald' || event.type =='caldDelivery') {
                    this.addDatapoint(event, 'CALD');
                }
            }
            if (this.selectedManifestations.length == 1) {
                let manifestation : Manifestation = this.filteredManifestations[this.selectedManifestations[0].titleID];
                this.options.title = {text: manifestation.shelfmark + ' (' + manifestation.edition + '. Auflage)'};
            } else {
                let title : string = "";
                for (let manifestation in this.selectedManifestations) {
                    title = title + this.manifestations[manifestation].shelfmark + ", ";
                }
                this.options.title = {text: title.substr(0,title.length-2)};
            }
        }
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

    addDatapoint(event : Event, classOfEvent : string) {
        if (event.time > 0) {
            let list: number[][];
            if ((typeof this.plotData[classOfEvent] === 'undefined')) {
                list = [];
                list.push([event.time, 1]);
            } else {
                list = this.plotData[classOfEvent];
                let lastDatapoint = list[list.length-1];
                list.push([event.time, lastDatapoint[1]]);
                list.push([event.time, lastDatapoint[1] + event.delta]);
            }
            this.plotData[classOfEvent] = list;
        }
    }

    exportTable(dt: DataTable) {
        dt.exportCSV();
    }

    toggleSelection(manifestation : Manifestation) {
        this.filterList[manifestation.titleID] = !this.filterList[manifestation.titleID];
        this.update();
    }
}
