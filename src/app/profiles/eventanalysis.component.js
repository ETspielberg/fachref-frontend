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
var eventanalysis_service_1 = require("../services/eventanalysis.service");
var ignored_service_1 = require("../services/ignored.service");
var router_1 = require("@angular/router");
var Ignored_1 = require("../model/Ignored");
var stockcontrol_service_1 = require("../services/stockcontrol.service");
var EventanalysisComponent = (function () {
    function EventanalysisComponent(eventanalysisService, router, route, ignoredService, stockcontrolService) {
        this.eventanalysisService = eventanalysisService;
        this.router = router;
        this.route = route;
        this.ignoredService = ignoredService;
        this.stockcontrolService = stockcontrolService;
    }
    EventanalysisComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showAllAnalyses = false;
        this.threshold = 1;
        this.eventanalyses = [];
        this.listOptions = [];
        this.route.params.subscribe(function (params) { return _this.identifier = params['identifier']; });
        this.sortedEventanalysis = new Map();
        this.resetIgnored();
        this.stockcontrolService.getStockcontrol(this.identifier).map(function (stockcontrol) { return _this.stockcontrol = stockcontrol; });
        this.busy = this.eventanalysisService.getAllForStockcontrolWiththreshold(this.identifier, this.threshold).toPromise().then(function (eventanalyses) { return _this.eventanalyses = eventanalyses; });
        this.busy.then(function (eventanalyses) { return _this.sortEventanalyses(); });
        this.selectedList = 'proposed';
    };
    EventanalysisComponent.prototype.reloadAllAnalyses = function () {
        var _this = this;
        this.busy = this.eventanalysisService.getAllForStockcontrol(this.identifier).toPromise().then(function (eventanalyses) { return _this.eventanalyses = eventanalyses; });
        this.busy.then(function (eventanalyses) { return _this.sortEventanalyses(); });
    };
    EventanalysisComponent.prototype.sortEventanalyses = function () {
        this.listOptions = [];
        var allOptions = new Set();
        this.sortedEventanalysis = new Map();
        for (var _i = 0, _a = this.eventanalyses; _i < _a.length; _i++) {
            var eventanalysis = _a[_i];
            if (eventanalysis.proposedDeletion == 0 && !this.showAllAnalyses) {
                continue;
            }
            var eventanalysesInd = [];
            var category = eventanalysis.status;
            if (allOptions.has(category)) {
                eventanalysesInd = this.sortedEventanalysis[eventanalysis.status];
            }
            else {
                allOptions.add(category);
            }
            eventanalysesInd.push(eventanalysis);
            this.sortedEventanalysis[eventanalysis.status] = eventanalysesInd;
        }
        var listOptions = Array.from(allOptions);
        for (var _b = 0, listOptions_1 = listOptions; _b < listOptions_1.length; _b++) {
            var listOption = listOptions_1[_b];
            var entry = { label: listOption, value: listOption };
            this.listOptions.push(entry);
        }
    };
    EventanalysisComponent.prototype.showDialog = function (eventanalysis) {
        this.display = true;
        this.transferInformation(eventanalysis);
        this.ignored.type = 'deletion';
        eventanalysis.status = 'ignored';
    };
    EventanalysisComponent.prototype.resetIgnored = function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        this.ignored = new Ignored_1.Ignored("", "", "", "", "", "", new Date(), new Date(year + 2, month, day));
    };
    EventanalysisComponent.prototype.toBlacklistStandard = function (eventanalysis) {
        this.resetIgnored();
        this.transferInformation(eventanalysis);
        //this.ignoredService.create(this.ignored);
        eventanalysis.status = 'ignored';
        this.saveIgnored();
    };
    EventanalysisComponent.prototype.transferInformation = function (eventanalysis) {
        this.ignored.shelfmark = eventanalysis.shelfmark;
        this.ignored.identifier = this.stockcontrol.identifier;
        this.ignored.titleId = eventanalysis.titleId;
        this.ignored.mab = eventanalysis.mab;
    };
    EventanalysisComponent.prototype.saveIgnored = function () {
        console.log(this.ignored);
        this.display = false;
        this.sortEventanalyses();
    };
    EventanalysisComponent.prototype.delete = function (eventanalysis) {
        eventanalysis.status = 'deletion';
        this.sortEventanalyses();
    };
    EventanalysisComponent.prototype.toRepository = function (eventanalysis) {
        eventanalysis.status = 'repository';
        this.sortEventanalyses();
    };
    EventanalysisComponent.prototype.toBlacklist = function (eventanalysis) {
        eventanalysis.status = 'ignored';
        this.sortEventanalyses();
    };
    EventanalysisComponent.prototype.toProposal = function (eventanalysis) {
        eventanalysis.status = 'proposed';
        this.sortEventanalyses();
    };
    EventanalysisComponent.prototype.saveStatus = function () {
        for (var _i = 0, _a = this.eventanalyses; _i < _a.length; _i++) {
            var eventanalysis = _a[_i];
            this.eventanalysisService.update(eventanalysis);
        }
    };
    EventanalysisComponent = __decorate([
        core_1.Component({
            selector: 'eventanalysis',
            templateUrl: './app/profiles/eventanalysis.component.html',
            providers: [eventanalysis_service_1.EventanalysisService, ignored_service_1.IgnoredService, stockcontrol_service_1.StockcontrolService]
        }),
        __metadata("design:paramtypes", [eventanalysis_service_1.EventanalysisService,
            router_1.Router,
            router_1.ActivatedRoute,
            ignored_service_1.IgnoredService,
            stockcontrol_service_1.StockcontrolService])
    ], EventanalysisComponent);
    return EventanalysisComponent;
}());
exports.EventanalysisComponent = EventanalysisComponent;
//# sourceMappingURL=eventanalysis.component.js.map