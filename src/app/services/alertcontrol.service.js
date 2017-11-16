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
var AlertcontrolService = (function () {
    function AlertcontrolService(_http, userService) {
        this._http = _http;
        this.userService = userService;
        this._alertcontrolUrl = 'http://localhost:11300/alertcontrol';
        this._profilePerUserUrl = 'http://localhost:11300/profilesperuser';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    AlertcontrolService.prototype.getAll = function () {
        return this._http.get(this._alertcontrolUrl).map(function (response) { return response.json(); });
    };
    AlertcontrolService.prototype.getAllForUsername = function () {
        this.username = this.userService.getUser().getName();
        return this._http.get(this._alertcontrolUrl + '/search/findByUsername?username=' + this.username)
            .map(function (response) { return response.json()._embedded.alertcontrol; });
    };
    AlertcontrolService.prototype.getAlertcontrol = function (identifier) {
        var url = this._alertcontrolUrl + "/" + identifier;
        console.log('querying url ' + url);
        return this._http.get(url)
            .map(function (response) { return response.json(); });
    };
    AlertcontrolService.prototype.deleteAlertcontrol = function (identifier) {
        return this._http.delete(this._alertcontrolUrl + '/' + identifier, { headers: this.headers });
    };
    AlertcontrolService.prototype.create = function (alertcontrol) {
        alertcontrol.identifier = alertcontrol.notationgroup + '_' + Date.now();
        var profilePerUser = new ProfilePerUser_1.ProfilePerUser(alertcontrol.identifier, this.userService.getUser().getName());
        var response = this._http
            .post(this._alertcontrolUrl, JSON.stringify(alertcontrol), { headers: this.headers })
            .map(function (res) { return res.json(); });
        this._http
            .post(this._profilePerUserUrl, JSON.stringify(profilePerUser), { headers: this.headers })
            .toPromise().then(function (res) { return console.log("saved stockcontrolUser" + res.json()); });
        return response;
    };
    AlertcontrolService.prototype.update = function (alertcontrol) {
        var url = this._alertcontrolUrl + "/" + alertcontrol.identifier;
        return this._http
            .put(url, JSON.stringify(alertcontrol), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    AlertcontrolService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService])
    ], AlertcontrolService);
    return AlertcontrolService;
}());
exports.AlertcontrolService = AlertcontrolService;
//# sourceMappingURL=alertcontrol.service.js.map