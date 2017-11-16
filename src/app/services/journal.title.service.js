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
var JournalTitleService = (function () {
    function JournalTitleService(_http) {
        this._http = _http;
        this._journaltitlenUrl = 'http://localhost:11500/journaltitle';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    JournalTitleService.prototype.getAll = function () {
        return this._http.get(this._journaltitlenUrl)
            .map(function (response) { return response.json(); });
    };
    JournalTitleService.prototype.delete = function (id) {
        var url = this._journaltitlenUrl + '/' + id;
        return this._http.delete(url, { headers: this.headers });
    };
    JournalTitleService.prototype.create = function (journalTitle) {
        return this._http
            .post(this._journaltitlenUrl, JSON.stringify(journalTitle), { headers: this.headers })
            .map(function (res) { return res.json(); });
    };
    JournalTitleService.prototype.update = function (journalTitle) {
        var url = this._journaltitlenUrl + "/" + journalTitle.id;
        return this._http
            .put(url, JSON.stringify(journalTitle), { headers: this.headers })
            .map(function () { return journalTitle; });
    };
    JournalTitleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], JournalTitleService);
    return JournalTitleService;
}());
exports.JournalTitleService = JournalTitleService;
//# sourceMappingURL=journal.title.service.js.map