"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ProtokollRequest_1 = require("../model/ProtokollRequest");
var getter_service_1 = require("../services/getter.service");
var router_1 = require("@angular/router");
var Option_1 = require("../model/Option");
var Dataset_1 = require("../model/Dataset");
var Datapoint_1 = require("../model/Datapoint");
var ProtokollComponent = (function () {
    function ProtokollComponent(getterService, route) {
        this.getterService = getterService;
        this.route = route;
    }
    ProtokollComponent.prototype.ngOnInit = function () {
        this.resetVariables();
        var shelfmarkFromRequest = "";
        var collectionsFromRequest = "";
        var materialsFromRequest = "";
        this.route.queryParams.subscribe(function (params) {
            return shelfmarkFromRequest = params['shelfmark'];
        });
        this.route.queryParams.subscribe(function (params) {
            return collectionsFromRequest = params['collections'];
        });
        this.route.queryParams.subscribe(function (params) {
            return materialsFromRequest = params['materials'];
        }, function (params) { return materialsFromRequest = ''; });
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
    };
    ProtokollComponent.prototype.resetVariables = function () {
        this.filteredManifestations = new Map();
        this.filteredItems = new Map();
        this.filteredEvents = new Map();
        this.selectedManifestations = [];
        this.selectedItems = [];
        this.selectedEvents = [];
        this.protokollRequest = new ProtokollRequest_1.ProtokollRequest("", "", "", false);
        this.manifestationsFound = false;
        this.filterList = new Map();
    };
    ProtokollComponent.prototype.getFullManifestations = function () {
        var _this = this;
        this.manifestations = [];
        this.busy = this.getterService.getFullManifestation(this.protokollRequest).toPromise();
        this.busy.then(function (manifestations) { return _this.manifestations = manifestations; });
        this.busy.then(function (manifestations) { return _this.initializeLists(); });
    };
    ProtokollComponent.prototype.initializeLists = function () {
        if (this.manifestations.length > 0) {
            this.manifestationsFound = true;
        }
        var uniqueCollections = new Set();
        var uniqueMaterials = new Set();
        for (var _i = 0, _a = this.manifestations; _i < _a.length; _i++) {
            var manifestation = _a[_i];
            this.filterList[manifestation.titleID] = true;
            this.selectedManifestations.push(manifestation);
            for (var _b = 0, _c = manifestation.collections; _b < _c.length; _b++) {
                var collection = _c[_b];
                if (!uniqueCollections.has(collection)) {
                    uniqueCollections.add(collection);
                    this.filterList[collection] = true;
                }
            }
            for (var _d = 0, _e = manifestation.materials; _d < _e.length; _d++) {
                var material = _e[_d];
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
    };
    ProtokollComponent.prototype.includeSelectionFromHttpParamters = function () {
        if (!(typeof this.protokollRequest.collections === 'undefined' || this.protokollRequest.collections.trim() == '')) {
            console.log(this.protokollRequest.collections);
            var individualCollections = [];
            if (this.protokollRequest.collections.indexOf(' ') > -1)
                individualCollections = this.protokollRequest.collections.split(' ');
            else
                individualCollections.push(this.protokollRequest.collections);
            for (var _i = 0, _a = this.uniqueCollections; _i < _a.length; _i++) {
                var f = _a[_i];
                var fitting = false;
                for (var _b = 0, individualCollections_1 = individualCollections; _b < individualCollections_1.length; _b++) {
                    var m = individualCollections_1[_b];
                    if (f.startsWith(m.trim())) {
                        fitting = true;
                    }
                }
                this.filterList[f] = fitting;
            }
        }
    };
    ProtokollComponent.prototype.update = function () {
        this.updateFilteredLists();
        this.updatePlotData();
    };
    ProtokollComponent.prototype.updateFilteredLists = function () {
        this.filteredManifestations = new Map();
        this.filteredItems = new Map();
        this.filteredEvents = new Map();
        this.selectedManifestations = [];
        this.selectedItems = [];
        this.selectedEvents = [];
        for (var _i = 0, _a = this.manifestations; _i < _a.length; _i++) {
            var m = _a[_i];
            if (this.filterList[m.titleID]) {
                this.selectedManifestations.push(m);
                this.filteredManifestations[m.titleID] = m;
                var filteredItemsInd = [];
                var filteredEventsInd = [];
                for (var _b = 0, _c = m.items; _b < _c.length; _b++) {
                    var item = _c[_b];
                    if (this.filterList[item.collection] && this.filterList[item.material]) {
                        filteredItemsInd.push(item);
                        this.selectedItems.push(item);
                        for (var _d = 0, _e = item.events; _d < _e.length; _d++) {
                            var event_1 = _e[_d];
                            filteredEventsInd.push(event_1);
                            this.selectedEvents.push(event_1);
                            if (event_1.endEvent != null) {
                                this.selectedEvents.push(event_1.endEvent);
                            }
                        }
                    }
                }
                this.filteredItems[m.titleID] = filteredItemsInd;
                this.filteredEvents[m.titleID] = filteredEventsInd;
            }
        }
        this.selectedEvents.sort(function (firstEvent, secondEvent) {
            return firstEvent.time == secondEvent.time ? 0 : +(firstEvent.time > secondEvent.time) || -1;
        });
    };
    ProtokollComponent.prototype.updatePlotData = function () {
        this.options = new Option_1.Option({ text: "" }, [], { title: { text: 'Anzahl' }, min: 0, allowDecimals: false }, { type: 'datetime' }, { defaultSeriesType: 'line', zoomType: 'xy' }, ['#AA4643', '#4572A7', '#89A54E', '#80699B',
            '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92']);
        this.plotData = new Map();
        for (var _i = 0, _a = this.selectedEvents; _i < _a.length; _i++) {
            var event_2 = _a[_i];
            if (this.showUsergroups) {
                this.addDatapoint(event_2, event_2.borrowerStatus);
            }
            else {
                if (event_2.type == 'loan' || event_2.type == 'return') {
                    this.addDatapoint(event_2, 'loans');
                }
                else if (event_2.type == 'request' || event_2.type == 'hold') {
                    this.addDatapoint(event_2, 'requests');
                }
                else if (event_2.type == 'inventory' || event_2.type == 'deletion') {
                    this.addDatapoint(event_2, 'stock');
                }
                else if (event_2.type == 'cald' || event_2.type == 'caldDelivery') {
                    this.addDatapoint(event_2, 'CALD');
                }
            }
            if (this.selectedManifestations.length == 1) {
                var manifestation = this.filteredManifestations[this.selectedManifestations[0].titleID];
                this.options.title = { text: manifestation.shelfmark + ' (' + manifestation.edition + '. Auflage)' };
            }
            else {
                var title = "";
                for (var manifestation in this.selectedManifestations) {
                    title = title + this.manifestations[manifestation].shelfmark + ", ";
                }
                this.options.title = { text: title.substr(0, title.length - 2) };
            }
        }
        this.updateChartObject();
    };
    ProtokollComponent.prototype.updateChartObject = function () {
        for (var key in this.plotData) {
            var datapoints = this.plotData[key];
            datapoints.push(new Datapoint_1.Datapoint(new Date().getTime(), datapoints[datapoints.length - 1][1]));
            var dataset = new Dataset_1.Dataset(key, datapoints);
            this.options.series.push(dataset);
        }
    };
    ProtokollComponent.prototype.addDatapoint = function (event, classOfEvent) {
        if (event.time > 0) {
            var list = void 0;
            if ((typeof this.plotData[classOfEvent] === 'undefined')) {
                list = [];
                list.push([event.time, 1]);
            }
            else {
                list = this.plotData[classOfEvent];
                var lastDatapoint = list[list.length - 1];
                list.push([event.time, lastDatapoint[1]]);
                list.push([event.time, lastDatapoint[1] + event.delta]);
            }
            this.plotData[classOfEvent] = list;
        }
    };
    ProtokollComponent.prototype.exportTable = function (dt) {
        dt.exportCSV();
    };
    ProtokollComponent.prototype.toggleSelection = function (manifestation) {
        this.filterList[manifestation.titleID] = !this.filterList[manifestation.titleID];
        this.update();
    };
    ProtokollComponent = __decorate([
        core_1.Component({
            selector: 'profiles',
            templateUrl: './app/protokoll/protokoll.component.html',
            providers: [getter_service_1.GetterService]
        }),
        __metadata("design:paramtypes", [getter_service_1.GetterService, router_1.ActivatedRoute])
    ], ProtokollComponent);
    return ProtokollComponent;
}());
exports.ProtokollComponent = ProtokollComponent;
//# sourceMappingURL=protokoll.component.js.map