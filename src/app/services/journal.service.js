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
var JournalService = (function () {
    function JournalService(_http) {
        this._http = _http;
        this._journalUrl = 'http://localhost:11500/journal';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    JournalService.prototype.getAll = function () {
        return this._http.get(this._journalUrl)
            .map(function (response) { return response.json(); });
    };
    JournalService.prototype.delete = function (id) {
        var url = this._journalUrl + '/' + id;
        return this._http.delete(url, { headers: this.headers });
    };
    JournalService.prototype.create = function (journal) {
        return this._http
            .post(this._journalUrl, JSON.stringify(journal), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    JournalService.prototype.update = function (journal) {
        var url = this._journalUrl + "/" + journal.id;
        return this._http
            .put(url, JSON.stringify(journal), { headers: this.headers })
            .map(function () { return journal; });
    };
    JournalService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], JournalService);
    return JournalService;
}());
exports.JournalService = JournalService;
//# sourceMappingURL=journal.service.js.map