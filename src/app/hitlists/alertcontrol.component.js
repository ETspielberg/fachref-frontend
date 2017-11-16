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
var alertcontrol_service_1 = require("../services/alertcontrol.service");
var router_1 = require("@angular/router");
var AlertcontrolComponent = (function () {
    function AlertcontrolComponent(alertcontrolService, router) {
        this.alertcontrolService = alertcontrolService;
        this.router = router;
    }
    AlertcontrolComponent.prototype.ngOnInit = function () {
        this.getAlertcontrols();
    };
    AlertcontrolComponent.prototype.getAlertcontrols = function () {
        var _this = this;
        this.alertcontrolService.getAllForUsername().subscribe(function (data) { return _this.alertcontrols = data; }, function (error) { return _this.errorMessage = error; });
    };
    AlertcontrolComponent.prototype.deleteAlertcontrol = function (alertcontrol) {
        var _this = this;
        this.alertcontrolService.deleteAlertcontrol(alertcontrol.identifier).subscribe(function () {
            _this.alertcontrols = _this.alertcontrols.filter(function (ac) { return ac != alertcontrol; });
        });
        this.router.navigate(['/hitlists']);
    };
    AlertcontrolComponent = __decorate([
        core_1.Component({
            selector: 'profiles',
            templateUrl: './app/hitlists/alertcontrol.component.html',
            providers: [alertcontrol_service_1.AlertcontrolService]
        }),
        __metadata("design:paramtypes", [alertcontrol_service_1.AlertcontrolService, router_1.Router])
    ], AlertcontrolComponent);
    return AlertcontrolComponent;
}());
exports.AlertcontrolComponent = AlertcontrolComponent;
//# sourceMappingURL=alertcontrol.component.js.map