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
require("rxjs/add/operator/toPromise");
var SushiproviderService = (function () {
    function SushiproviderService(_http) {
        this._http = _http;
        this._sushiproviderUrl = 'http://localhost:11300/sushiprovider';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    SushiproviderService.prototype.getAll = function () {
        return this._http.get(this._sushiproviderUrl)
            .map(function (response) { return response.json()._embedded.sushiprovider; });
    };
    SushiproviderService.prototype.getSushiprovider = function (identifier) {
        var url = this._sushiproviderUrl + "/" + identifier;
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    SushiproviderService.prototype.deleteSushiprovider = function (identifier) {
        var url = this._sushiproviderUrl + '/' + identifier;
        return this._http.delete(url, { headers: this.headers });
    };
    SushiproviderService.prototype.create = function (sushiprovider) {
        return this._http
            .post(this._sushiproviderUrl, JSON.stringify(sushiprovider), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    SushiproviderService.prototype.update = function (sushiprovider) {
        var url = this._sushiproviderUrl + "/" + sushiprovider.identifier;
        return this._http
            .put(url, JSON.stringify(sushiprovider), { headers: this.headers })
            .map(function () { return sushiprovider; });
    };
    SushiproviderService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], SushiproviderService);
    return SushiproviderService;
}());
exports.SushiproviderService = SushiproviderService;
//# sourceMappingURL=sushiprovider.service.js.map