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
var common_1 = require("@angular/common");
var primeng_1 = require("primeng/primeng");
var forms_1 = require("@angular/forms");
var profiles_routing_1 = require("./profiles.routing");
var stockcontrol_component_1 = require("./stockcontrol.component");
var stockcontrol_editor_component_1 = require("./stockcontrol.editor.component");
var eventanalysis_component_1 = require("./eventanalysis.component");
var stockcontrol_service_1 = require("../services/stockcontrol.service");
var eventanalysis_service_1 = require("../services/eventanalysis.service");
var ProfilesModule = (function () {
    function ProfilesModule() {
    }
    ProfilesModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule,
                common_1.CommonModule,
                router_1.RouterModule,
                primeng_1.DataTableModule,
                primeng_1.ToggleButtonModule,
                primeng_1.SpinnerModule,
                forms_1.FormsModule,
                primeng_1.TabMenuModule,
                primeng_1.SelectButtonModule,
                primeng_1.CalendarModule,
                primeng_1.DialogModule,
                primeng_1.InputSwitchModule,
                profiles_routing_1.profilesRouting],
            declarations: [stockcontrol_component_1.StockcontrolComponent, stockcontrol_editor_component_1.StockcontrolEditorComponent, eventanalysis_component_1.EventanalysisComponent],
            exports: [stockcontrol_component_1.StockcontrolComponent, stockcontrol_editor_component_1.StockcontrolEditorComponent, eventanalysis_component_1.EventanalysisComponent],
            providers: [user_service_1.UserService, stockcontrol_service_1.StockcontrolService, eventanalysis_service_1.EventanalysisService]
        })
    ], ProfilesModule);
    return ProfilesModule;
}());
exports.ProfilesModule = ProfilesModule;
//# sourceMappingURL=profiles.module.js.map