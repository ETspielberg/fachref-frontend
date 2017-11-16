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
var http_1 = require("@angular/http");
var NrequestsService = (function () {
    function NrequestsService(_http) {
        this._http = _http;
        this._nrequestsUrl = 'http://localhost:11200/nrequests';
    }
    NrequestsService.prototype.getAll = function () {
        return this._http.get(this._nrequestsUrl)
            .map(function (response) { return response.json()._embedded.nrequests; });
    };
    NrequestsService.prototype.getAllForRange = function (startNotation, endNotation) {
        var url = this._nrequestsUrl + '/search/getNrequestsForNotationgroup?startNotation=' + startNotation + "&endNotation=" + endNotation;
        console.log(url);
        return this._http.get(url)
            .map(function (response) { return response.json()._embedded.nrequests; });
    };
    NrequestsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], NrequestsService);
    return NrequestsService;
}());
exports.NrequestsService = NrequestsService;
//# sourceMappingURL=nrequests.service.js.map