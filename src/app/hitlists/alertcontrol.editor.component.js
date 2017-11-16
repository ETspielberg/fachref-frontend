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
var common_1 = require("@angular/common");
var alertcontrol_service_1 = require("../services/alertcontrol.service");
require("rxjs/add/operator/switchMap");
var profilesperuser_service_1 = require("../services/profilesperuser.service");
var ProfilePerUser_1 = require("../model/ProfilePerUser");
var AlertcontrolEditorComponent = (function () {
    function AlertcontrolEditorComponent(alertcontrolService, route, location, router, profilePerUserService) {
        this.alertcontrolService = alertcontrolService;
        this.route = route;
        this.location = location;
        this.router = router;
        this.profilePerUserService = profilePerUserService;
    }
    AlertcontrolEditorComponent.prototype.ngOnInit = function () {
        this.update();
    };
    AlertcontrolEditorComponent.prototype.update = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.alertcontrolService.getAlertcontrol(params['identifier']); })
            .subscribe(function (alertcontrol) { return _this.alertcontrol = alertcontrol; });
    };
    AlertcontrolEditorComponent.prototype.goBack = function () {
        this.location.back();
    };
    AlertcontrolEditorComponent.prototype.save = function (alertcontrol) {
        if (alertcontrol.identifier == 'newAlertcontrol') {
            this.alertcontrolService.create(alertcontrol).subscribe(function (res) { return alertcontrol = res; });
        }
        else {
            this.alertcontrolService.update(alertcontrol).subscribe(function (res) { return alertcontrol = res; });
        }
        this.router.navigate(['/hitlists']);
    };
    AlertcontrolEditorComponent.prototype.addStockcontrolUser = function (username) {
        var profilePerUser = new ProfilePerUser_1.ProfilePerUser(this.alertcontrol.identifier, username);
        this.profilePerUserService.addProfilePerUsers(profilePerUser).subscribe(function (data) { return profilePerUser = data; });
        this.profilePerUser.push(profilePerUser);
    };
    AlertcontrolEditorComponent.prototype.deleteStockcontrolUser = function (profilePerUser) {
        var _this = this;
        if (profilePerUser.id != null) {
            this.profilePerUserService.deleteProfilePerUsers(profilePerUser.id).subscribe(function () {
                _this.profilePerUser = _this.profilePerUser.filter(function (scu) { return scu != profilePerUser; });
            });
        }
        else {
            console.log('no id given');
        }
    };
    AlertcontrolEditorComponent = __decorate([
        core_1.Component({
            selector: 'stockcontrol-editor',
            templateUrl: './app/hitlists/alertcontrol.editor.component.html',
            providers: [alertcontrol_service_1.AlertcontrolService, profilesperuser_service_1.ProfilesPerUserService]
        }),
        __metadata("design:paramtypes", [alertcontrol_service_1.AlertcontrolService,
            router_1.ActivatedRoute,
            common_1.Location,
            router_1.Router,
            profilesperuser_service_1.ProfilesPerUserService])
    ], AlertcontrolEditorComponent);
    return AlertcontrolEditorComponent;
}());
exports.AlertcontrolEditorComponent = AlertcontrolEditorComponent;
//# sourceMappingURL=alertcontrol.editor.component.js.map