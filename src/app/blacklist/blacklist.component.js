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
var ignored_service_1 = require("../services/ignored.service");
var router_1 = require("@angular/router");
var BlacklistComponent = (function () {
    function BlacklistComponent(ignoredService, router) {
        this.ignoredService = ignoredService;
        this.router = router;
    }
    BlacklistComponent.prototype.ngOnInit = function () {
        this.getBlacklist();
    };
    BlacklistComponent.prototype.getBlacklist = function () {
        var _this = this;
        this.ignoredService.getAll().map(function (blacklist) { return _this.blacklist = blacklist; });
    };
    BlacklistComponent.prototype.deleteIgnored = function (ignored) {
        var _this = this;
        this.ignoredService.deleteIgnored(ignored.identifier).map(function () {
            _this.blacklist.filter(function (ig) { return ig != ignored; });
        });
    };
    BlacklistComponent.prototype.newStockcontrol = function () {
    };
    BlacklistComponent = __decorate([
        core_1.Component({
            selector: 'blacklist',
            templateUrl: './blacklist.component.html',
            providers: [ignored_service_1.IgnoredService]
        }),
        __metadata("design:paramtypes", [ignored_service_1.IgnoredService, router_1.Router])
    ], BlacklistComponent);
    return BlacklistComponent;
}());
exports.BlacklistComponent = BlacklistComponent;
//# sourceMappingURL=blacklist.component.js.map