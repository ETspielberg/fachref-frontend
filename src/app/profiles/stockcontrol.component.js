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
var stockcontrol_service_1 = require("../services/stockcontrol.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var StockcontrolComponent = (function () {
    function StockcontrolComponent(stockcontrolService, router, _http) {
        this.stockcontrolService = stockcontrolService;
        this.router = router;
        this._http = _http;
        this._batchUrl = 'http://localhost:11822/batch';
    }
    StockcontrolComponent.prototype.ngOnInit = function () {
        this.getStockcontrols();
    };
    StockcontrolComponent.prototype.getStockcontrols = function () {
        var _this = this;
        var busy = this.stockcontrolService.getAllForUsername().subscribe(function (data) { return _this.stockcontrols = data; });
    };
    StockcontrolComponent.prototype.deleteStockcontrol = function (stockcontrol) {
        var _this = this;
        this.stockcontrolService.deleteStockcontrol(stockcontrol.identifier).subscribe(function () {
            _this.stockcontrols = _this.stockcontrols.filter(function (sc) { return sc != stockcontrol; });
        });
        this.router.navigate(['/profiles']);
    };
    StockcontrolComponent.prototype.runStockcontrol = function (stockcontrol) {
        this._http.get(this._batchUrl + "/eventanalyzer?identifier=" + stockcontrol.identifier).subscribe(function (res) { return console.log(res); });
    };
    StockcontrolComponent = __decorate([
        core_1.Component({
            selector: 'profiles',
            templateUrl: './app/profiles/stockcontrol.component.html',
            providers: [stockcontrol_service_1.StockcontrolService]
        }),
        __metadata("design:paramtypes", [stockcontrol_service_1.StockcontrolService, router_1.Router, http_1.Http])
    ], StockcontrolComponent);
    return StockcontrolComponent;
}());
exports.StockcontrolComponent = StockcontrolComponent;
//# sourceMappingURL=stockcontrol.component.js.map