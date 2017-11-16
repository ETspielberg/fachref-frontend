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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var sushiprovider_service_1 = require("../services/sushiprovider.service");
var SushiComponent = (function () {
    function SushiComponent(sushiproviderService, router, _http) {
        this.sushiproviderService = sushiproviderService;
        this.router = router;
        this._http = _http;
        this._batchUrl = 'http://localhost:11822/batch';
        this.reportTypes = [
            { value: "JR1", label: "Journal Report 1" },
            { value: "BR1", label: "Book Report 1" },
            { value: "BR2", label: "Book Report 2" },
            { value: "PR1", label: "Plattform Report 1" }
        ];
    }
    SushiComponent.prototype.ngOnInit = function () {
        this.getSushiproviders();
    };
    SushiComponent.prototype.getSushiproviders = function () {
        var _this = this;
        var busy = this.sushiproviderService.getAll().subscribe(function (data) { return _this.sushiproviders = data.filter(function (sc) { return sc.identifier != 'newSushiprovider'; }); });
    };
    SushiComponent.prototype.deleteSushiprovider = function (sushiprovider) {
        var _this = this;
        this.sushiproviderService.deleteSushiprovider(sushiprovider.identifier).subscribe(function () {
            _this.sushiproviders = _this.sushiproviders.filter(function (sc) { return sc != sushiprovider; });
        });
        this.router.navigate(['/media/sushi']);
    };
    SushiComponent.prototype.collectSushiData = function (sushiprovider) {
        this._http.get(this._batchUrl + "/sushi?identifier=" + sushiprovider.identifier + "&type=" + this.selectedReport + "&mode=initialize").subscribe(function (res) { return console.log(res); });
    };
    SushiComponent = __decorate([
        core_1.Component({
            selector: 'sushi',
            templateUrl: './app/media/sushi.component.html',
            providers: [sushiprovider_service_1.SushiproviderService]
        }),
        __metadata("design:paramtypes", [sushiprovider_service_1.SushiproviderService, router_1.Router, http_1.Http])
    ], SushiComponent);
    return SushiComponent;
}());
exports.SushiComponent = SushiComponent;
//# sourceMappingURL=sushi.component.js.map