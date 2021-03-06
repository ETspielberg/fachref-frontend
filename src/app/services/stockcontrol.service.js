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
var user_service_1 = require("./user.service");
var ProfilePerUser_1 = require("../model/ProfilePerUser");
var StockcontrolService = (function () {
    function StockcontrolService(_http, userService) {
        this._http = _http;
        this.userService = userService;
        this._stockcontrolUrl = 'http://localhost:11300/stockcontrol';
        this._profilePerUserUrl = 'http://localhost:11300/profilesperuser';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    StockcontrolService.prototype.getAll = function () {
        return this._http.get(this._stockcontrolUrl)
            .map(function (response) { return response.json(); });
    };
    StockcontrolService.prototype.getAllForUsername = function () {
        this.username = this.userService.getUser().getName();
        console.log('retrieving stockcontrol for ' + this.username);
        return this._http.get(this._stockcontrolUrl + '/search/findByUsername?username=' + this.username)
            .map(function (response) { return response.json()._embedded.stockcontrol; });
    };
    StockcontrolService.prototype.getStockcontrol = function (identifier) {
        var url = this._stockcontrolUrl + "/" + identifier;
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    StockcontrolService.prototype.deleteStockcontrol = function (identifier) {
        var url = this._stockcontrolUrl + '/' + identifier;
        return this._http.delete(url, { headers: this.headers });
    };
    StockcontrolService.prototype.create = function (stockcontrol) {
        stockcontrol.identifier = stockcontrol.subjectID + '_' + Date.now();
        var profilePerUser = new ProfilePerUser_1.ProfilePerUser(stockcontrol.identifier, this.userService.getUser().getName());
        this._http
            .post(this._profilePerUserUrl, JSON.stringify(profilePerUser), { headers: this.headers })
            .toPromise().then(function (res) { return console.log("saved stockcontrolUser" + res.json()); });
        return this._http
            .post(this._stockcontrolUrl, JSON.stringify(stockcontrol), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    StockcontrolService.prototype.update = function (stockcontrol) {
        var url = this._stockcontrolUrl + "/" + stockcontrol.identifier;
        return this._http
            .put(url, JSON.stringify(stockcontrol), { headers: this.headers })
            .map(function () { return stockcontrol; });
    };
    StockcontrolService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService])
    ], StockcontrolService);
    return StockcontrolService;
}());
exports.StockcontrolService = StockcontrolService;
//# sourceMappingURL=stockcontrol.service.js.map