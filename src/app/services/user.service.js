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
/**
 * Created by etspi on 22.06.2017.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/toPromise");
var ActiveUser_1 = require("../model/ActiveUser");
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
        this._usersettingsUrl = 'http://localhost:11300/usersettings';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    UserService.prototype.get = function (id) {
        var url = this._usersettingsUrl + "/" + id;
        return this._http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.create = function (usersettings) {
        return this._http
            .post(this._usersettingsUrl, JSON.stringify(usersettings), { headers: this.headers }).map(function (response) { return response.json(); });
    };
    UserService.prototype.getUser = function () {
        this.user = new ActiveUser_1.User('fachref', ['ROLE_FACHREFERENT', 'ROLE_ADMIN', 'ROLE_MEDIA']);
        //this._http.get("http://localhost:8080/activeuser").toPromise().then(res => this.user = res.json());
        return this.user;
    };
    UserService.prototype.getAll = function () {
        return this._http.get(this._usersettingsUrl).map(function (response) { return response.json()._embedded.usersettings; });
    };
    UserService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map