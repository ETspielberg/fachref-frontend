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
var stockcontrol_service_1 = require("../services/stockcontrol.service");
require("rxjs/add/operator/switchMap");
var ProfilePerUser_1 = require("../model/ProfilePerUser");
var user_service_1 = require("../services/user.service");
var profilesperuser_service_1 = require("../services/profilesperuser.service");
var StockcontrolEditorComponent = (function () {
    function StockcontrolEditorComponent(stockcontrolService, profilePerUserService, userService, route, location, router) {
        this.stockcontrolService = stockcontrolService;
        this.profilePerUserService = profilePerUserService;
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.router = router;
    }
    StockcontrolEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.stockcontrolService.getStockcontrol(params['identifier']); })
            .subscribe(function (stockcontrol) { return _this.stockcontrol = stockcontrol; });
        this.route.params
            .switchMap(function (params) { return _this.profilePerUserService.getProfilePerUsers(params['identifier']); })
            .subscribe(function (profilePerUsers) { return _this.profilePerUsers = profilePerUsers; });
        this.user = this.userService.getUser();
    };
    StockcontrolEditorComponent.prototype.goBack = function () {
        this.location.back();
    };
    StockcontrolEditorComponent.prototype.save = function (stockControl) {
        var _this = this;
        if (stockControl.identifier == 'newProfile') {
            this.stockcontrolService.create(stockControl).subscribe(function (data) { return _this.stockcontrol = data; });
        }
        else {
            this.stockcontrolService.update(stockControl);
        }
        this.router.navigate(['/profiles']);
    };
    StockcontrolEditorComponent.prototype.addStockcontrolUser = function (username) {
        var profilePerUser = new ProfilePerUser_1.ProfilePerUser(this.stockcontrol.identifier, username);
        this.profilePerUserService.addProfilePerUsers(profilePerUser).subscribe(function (data) { return profilePerUser = data; });
        this.profilePerUsers.push(profilePerUser);
    };
    StockcontrolEditorComponent.prototype.deleteStockcontrolUser = function (profilePerUser) {
        var _this = this;
        if (profilePerUser.id != null) {
            this.profilePerUserService.deleteProfilePerUsers(profilePerUser.id).subscribe(function () {
                _this.profilePerUsers = _this.profilePerUsers.filter(function (scu) { return scu != profilePerUser; });
            });
        }
        else {
            console.log('no id given');
        }
    };
    StockcontrolEditorComponent = __decorate([
        core_1.Component({
            selector: 'stockcontrol-editor',
            templateUrl: './app/profiles/stockcontrol.editor.component.html',
            providers: [stockcontrol_service_1.StockcontrolService, user_service_1.UserService, profilesperuser_service_1.ProfilesPerUserService]
        }),
        __metadata("design:paramtypes", [stockcontrol_service_1.StockcontrolService,
            profilesperuser_service_1.ProfilesPerUserService,
            user_service_1.UserService,
            router_1.ActivatedRoute,
            common_1.Location,
            router_1.Router])
    ], StockcontrolEditorComponent);
    return StockcontrolEditorComponent;
}());
exports.StockcontrolEditorComponent = StockcontrolEditorComponent;
//# sourceMappingURL=stockcontrol.editor.component.js.map