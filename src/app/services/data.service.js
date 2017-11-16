"use strict";
/**
 * Created by Eike on 26.06.2017.
 */
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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var DataService = (function () {
    function DataService(_http) {
        this._http = _http;
        this.baseUrl = 'http://localhost:11200';
        this._journalcounterUrl = this.baseUrl + '/journalcounter';
        this._ebookcounterUrl = this.baseUrl + '/ebookcounter';
        this._databasecounterUrl = this.baseUrl + '/databasecounter';
        this._eventanalysisUrl = this.baseUrl + "/eventanalysis";
        this._nrequestsUrl = this.baseUrl + "/nrequests";
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    DataService.prototype.getAllJournalcounterForIssn = function (issn) {
        return this._http.get(this._journalcounterUrl + '/search/findByIssn?identifier=' + issn)
            .map(function (response) { return response.json()._embedded.journalcounter; });
    };
    DataService.prototype.getAllJournalcounterForJournalcollection = function (journalcollection) {
        return this._http.get(this._journalcounterUrl + '/search/findByJournalcollection?onlineIssn=' + journalcollection)
            .map(function (response) { return response.json()._embedded.journalcounter; });
    };
    DataService.prototype.getAllEbookcounterForIsbn = function (isbn) {
        return this._http.get(this._ebookcounterUrl + '/search/findByIsbn?onlineIsbn=' + isbn)
            .map(function (response) { return response.json()._embedded.ebookcounter; });
    };
    DataService.prototype.getAllDatabasecounterForPlatform = function (name) {
        return this._http.get(this._databasecounterUrl + '/search/findByName?name=' + name)
            .map(function (response) { return response.json()._embedded.ebookcounter; });
    };
    DataService.prototype.getAllNrequests = function () {
        return this._http.get(this._nrequestsUrl)
            .map(function (response) { return response.json()._embedded.nrequests; });
    };
    DataService.prototype.getAllNRequestsForRange = function (startNotation, endNotation) {
        var url = this._nrequestsUrl + '/search/getNrequestsForNotationgroup?startNotation=' + startNotation + "&endNotation=" + endNotation;
        console.log(url);
        return this._http.get(url)
            .map(function (response) { return response.json()._embedded.nrequests; });
    };
    DataService.prototype.getAllEventanalysisForStockcontrol = function (stockcontrol) {
        return this._http.get(this._eventanalysisUrl + '/search/findByStockcontrolId?stockcontrolId=' + stockcontrol)
            .map(function (response) { return response.json()._embedded.eventanalysis; });
    };
    DataService.prototype.getAllEventanalysisForStockcontrolWiththreshold = function (stockcontrol, threshold) {
        return this._http.get(this._eventanalysisUrl + '/search/findByStockcontrolIdAndProposedDeletionGreaterThanEqual?stockcontrolId=' + stockcontrol + '&proposedDeletion=' + threshold)
            .map(function (response) { return response.json()._embedded.eventanalysis; });
    };
    DataService.prototype.updateEventanalysis = function (eventanalysis) {
        var url = this._eventanalysisUrl + "/" + eventanalysis.titleId;
        return this._http
            .put(url, JSON.stringify(eventanalysis), { headers: this.headers })
            .map(function () { return eventanalysis; });
    };
    DataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map