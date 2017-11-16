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
var nrequests_component_1 = require("./nrequests.component");
var alertcontrol_component_1 = require("./alertcontrol.component");
var alertcontrol_service_1 = require("../services/alertcontrol.service");
var nrequests_service_1 = require("../services/nrequests.service");
var common_1 = require("@angular/common");
var hitlists_routing_1 = require("./hitlists.routing");
var alertcontrol_editor_component_1 = require("./alertcontrol.editor.component");
var primeng_1 = require("primeng/primeng");
var forms_1 = require("@angular/forms");
var HitlistsModule = (function () {
    function HitlistsModule() {
    }
    HitlistsModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule,
                common_1.CommonModule,
                router_1.RouterModule,
                primeng_1.DataTableModule,
                primeng_1.ToggleButtonModule,
                primeng_1.SpinnerModule,
                forms_1.FormsModule,
                primeng_1.InputSwitchModule,
                hitlists_routing_1.hitlistsRouting],
            declarations: [nrequests_component_1.NrequestsComponent, alertcontrol_component_1.AlertcontrolComponent, alertcontrol_editor_component_1.AlertcontrolEditorComponent],
            exports: [nrequests_component_1.NrequestsComponent, alertcontrol_component_1.AlertcontrolComponent, alertcontrol_editor_component_1.AlertcontrolEditorComponent],
            providers: [user_service_1.UserService, alertcontrol_service_1.AlertcontrolService, nrequests_service_1.NrequestsService]
        })
    ], HitlistsModule);
    return HitlistsModule;
}());
exports.HitlistsModule = HitlistsModule;
//# sourceMappingURL=hitlists.module.js.map