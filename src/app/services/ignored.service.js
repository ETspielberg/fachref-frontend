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
var IgnoredService = (function () {
    function IgnoredService(_http) {
        this._http = _http;
        this._ignoredUrl = 'http://localhost:11400/blacklist';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    IgnoredService.prototype.getAll = function () {
        return this._http.get(this._ignoredUrl)
            .map(function (response) { return response.json(); });
    };
    IgnoredService.prototype.deleteIgnored = function (id) {
        var url = this._ignoredUrl + '/' + id;
        return this._http.delete(url, { headers: this.headers });
    };
    IgnoredService.prototype.create = function (ignored) {
        return this._http
            .post(this._ignoredUrl, JSON.stringify(ignored), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    IgnoredService.prototype.update = function (ignored) {
        var url = this._ignoredUrl + "/" + ignored.identifier;
        return this._http
            .put(url, JSON.stringify(ignored), { headers: this.headers })
            .map(function () { return ignored; });
    };
    IgnoredService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], IgnoredService);
    return IgnoredService;
}());
exports.IgnoredService = IgnoredService;
//# sourceMappingURL=ignored.service.js.map