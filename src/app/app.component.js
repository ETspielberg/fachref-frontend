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
var user_service_1 = require("./services/user.service");
var AppComponent = (function () {
    function AppComponent(userService) {
        this.userService = userService;
        this.title = "FachRef-Assistent";
    }
    AppComponent.prototype.ngOnInit = function () {
        this.user = this.userService.getUser();
        this.admin = this.user && this.user.getRoles() && this.user.roles.indexOf("ROLE_ADMIN") > -1;
        this.fachreferent = this.user && this.user.getRoles() && this.user.roles.indexOf("ROLE_FACHREFERENT") > -1;
        this.media = this.user && this.user.getRoles() && this.user.roles.indexOf("ROLE_MEDIA") > -1;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: './app/app.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map