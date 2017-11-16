"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../services/user.service");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var usersettings_component_1 = require("./usersettings.component");
var common_1 = require("@angular/common");
var primeng_1 = require("primeng/primeng");
var forms_1 = require("@angular/forms");
var usersettings_routing_1 = require("./usersettings.routing");
var UsersettingsModule = (function () {
    function UsersettingsModule() {
    }
    UsersettingsModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule,
                router_1.RouterModule,
                common_1.CommonModule,
                primeng_1.SpinnerModule,
                forms_1.FormsModule,
                primeng_1.MultiSelectModule,
                usersettings_routing_1.usersettingsRouting],
            declarations: [usersettings_component_1.UsersettingsComponent],
            exports: [usersettings_component_1.UsersettingsComponent],
            providers: [user_service_1.UserService]
        })
    ], UsersettingsModule);
    return UsersettingsModule;
}());
exports.UsersettingsModule = UsersettingsModule;
//# sourceMappingURL=usersettings.module.js.map