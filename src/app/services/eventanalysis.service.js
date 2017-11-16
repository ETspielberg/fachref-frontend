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
var EventanalysisService = (function () {
    function EventanalysisService(_http) {
        this._http = _http;
        this._eventanalysisUrl = 'http://localhost:11200/eventanalysis';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    EventanalysisService.prototype.getAllForStockcontrol = function (stockcontrol) {
        return this._http.get(this._eventanalysisUrl + '/search/findByStockcontrolId?stockcontrolId=' + stockcontrol)
            .map(function (response) { return response.json()._embedded.eventanalysis; });
    };
    EventanalysisService.prototype.getAllForStockcontrolWiththreshold = function (stockcontrol, threshold) {
        return this._http.get(this._eventanalysisUrl + '/search/findByStockcontrolIdAndProposedDeletionGreaterThanEqual?stockcontrolId=' + stockcontrol + '&proposedDeletion=' + threshold)
            .map(function (response) { return response.json()._embedded.eventanalysis; });
    };
    EventanalysisService.prototype.update = function (eventanalysis) {
        var url = this._eventanalysisUrl + "/" + eventanalysis.titleId;
        return this._http
            .put(url, JSON.stringify(eventanalysis), { headers: this.headers })
            .map(function () { return eventanalysis; });
    };
    EventanalysisService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], EventanalysisService);
    return EventanalysisService;
}());
exports.EventanalysisService = EventanalysisService;
//# sourceMappingURL=eventanalysis.service.js.map