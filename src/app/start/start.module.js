"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var user_service_1 = require("../services/user.service");
var start_component_1 = require("./start.component");
var start_routing_1 = require("./start.routing");
var common_1 = require("@angular/common");
var StartModule = (function () {
    function StartModule() {
    }
    StartModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule,
                router_1.RouterModule,
                common_1.CommonModule,
                start_routing_1.startRouting],
            declarations: [start_component_1.StartComponent],
            exports: [start_component_1.StartComponent],
            providers: [user_service_1.UserService]
        })
    ], StartModule);
    return StartModule;
}());
exports.StartModule = StartModule;
//# sourceMappingURL=start.module.js.map