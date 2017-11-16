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
var admin_component_1 = require("./admin.component");
var admin_routing_1 = require("./admin.routing");
var admin_userroles_component_1 = require("./admin.userroles.component");
var primeng_1 = require("primeng/primeng");
var common_1 = require("@angular/common");
var file_service_1 = require("../services/file.service");
var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule,
                router_1.RouterModule,
                primeng_1.FileUploadModule,
                primeng_1.GrowlModule,
                common_1.CommonModule,
                admin_routing_1.adminRouting],
            declarations: [admin_component_1.AdminComponent, admin_userroles_component_1.UserAdminComponent],
            exports: [],
            providers: [user_service_1.UserService, file_service_1.FileService]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map