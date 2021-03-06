"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var journalcounter_component_1 = require("./journalcounter.component");
var user_service_1 = require("../services/user.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var angular2_busy_1 = require("angular2-busy");
var datatable_1 = require("primeng/components/datatable/datatable");
var primeng_1 = require("primeng/primeng");
var angular2_highcharts_1 = require("angular2-highcharts");
var forms_1 = require("@angular/forms");
var ejournals_routing_1 = require("./ejournals.routing");
var common_1 = require("@angular/common");
var EJournalsModule = (function () {
    function EJournalsModule() {
    }
    EJournalsModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule,
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                angular2_busy_1.BusyModule,
                datatable_1.DataTableModule,
                primeng_1.ToggleButtonModule,
                primeng_1.InputSwitchModule,
                primeng_1.TabMenuModule,
                primeng_1.SelectButtonModule,
                angular2_highcharts_1.ChartModule.forRoot(require('highcharts')),
                ejournals_routing_1.eJournalsRouting],
            declarations: [journalcounter_component_1.JournalcounterComponent],
            exports: [journalcounter_component_1.JournalcounterComponent],
            providers: [user_service_1.UserService]
        })
    ], EJournalsModule);
    return EJournalsModule;
}());
exports.EJournalsModule = EJournalsModule;
//# sourceMappingURL=ejournals.module.js.map