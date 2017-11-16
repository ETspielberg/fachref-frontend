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
var router_1 = require("@angular/router");
var data_service_1 = require("../services/data.service");
var Option_1 = require("../model/Option");
var Datapoint_1 = require("../model/Datapoint");
var Dataset_1 = require("../model/Dataset");
var JournalcounterComponent = (function () {
    function JournalcounterComponent(dataService, route) {
        this.dataService = dataService;
        this.route = route;
    }
    JournalcounterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.issnsString = params['onlineIssn']; });
        this.getJournalCounters();
    };
    JournalcounterComponent.prototype.getJournalCounters = function () {
        var _this = this;
        if (this.issnsString != null) {
            this.issns = this.issnsString.split(" ");
            var _loop_1 = function (issn) {
                this_1.dataService.getAllJournalcounterForIssn(issn).subscribe(function (data) { return _this.journalcounters[issn] = data; });
            };
            var this_1 = this;
            for (var _i = 0, _a = this.issns; _i < _a.length; _i++) {
                var issn = _a[_i];
                _loop_1(issn);
            }
        }
    };
    JournalcounterComponent.prototype.updatePlotData = function () {
        this.options = new Option_1.Option({ text: "" }, [], { title: { text: 'Anzahl' }, min: 0, allowDecimals: false }, { type: 'datetime' }, { defaultSeriesType: 'line', zoomType: 'xy' }, ['#AA4643', '#4572A7', '#89A54E', '#80699B',
            '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92']);
        this.options.lang = {
            months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
                'Juli', 'August', 'September', 'Oktober', 'November',
                'Dezember']
        };
        this.plotData = new Map();
        this.updateChartObject();
    };
    JournalcounterComponent.prototype.updateChartObject = function () {
        for (var key in this.plotData) {
            var datapoints = this.plotData[key];
            datapoints.push(new Datapoint_1.Datapoint(new Date().getTime(), datapoints[datapoints.length - 1][1]));
            var dataset = new Dataset_1.Dataset(key, datapoints);
            this.options.series.push(dataset);
        }
    };
    JournalcounterComponent = __decorate([
        core_1.Component({
            selector: 'journalcounter',
            templateUrl: './app/eJournals/journalcounter.component.html',
            providers: [data_service_1.DataService]
        }),
        __metadata("design:paramtypes", [data_service_1.DataService,
            router_1.ActivatedRoute])
    ], JournalcounterComponent);
    return JournalcounterComponent;
}());
exports.JournalcounterComponent = JournalcounterComponent;
//# sourceMappingURL=journalcounter.component.js.map