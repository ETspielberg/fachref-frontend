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
var nrequests_service_1 = require("../services/nrequests.service");
var alertcontrol_service_1 = require("../services/alertcontrol.service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var notationgroup_service_1 = require("../services/notationgroup.service");
var NrequestsComponent = (function () {
    function NrequestsComponent(nrequestsService, route, alertcontrolService, notationgroupService) {
        this.nrequestsService = nrequestsService;
        this.route = route;
        this.alertcontrolService = alertcontrolService;
        this.notationgroupService = notationgroupService;
    }
    NrequestsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) { return _this.identifier = params['identifier']; });
        if (this.identifier == 'all') {
            this.getAllNrequests();
        }
        else {
            var busy = this.alertcontrolService.getAlertcontrol(this.identifier).toPromise().then(function (alertcontrol) { return _this.alertcontrol = alertcontrol; });
            var busyTwo = busy.then(function (alertcontrol) { return _this.notationgroupService.get(_this.alertcontrol.notationgroup).toPromise().then(function (notationgroup) { return _this.notationgroup = notationgroup; }); });
            busyTwo.then(function (notationgroup) { return _this.nrequestsService.getAllForRange(_this.notationgroup.notationsStart, _this.notationgroup.notationsEnd).subscribe(function (data) { return _this.nrequestss = data; }, function (error) { return _this.errorMessage = error; }); });
        }
    };
    NrequestsComponent.prototype.getAllNrequests = function () {
        var _this = this;
        this.nrequestsService.getAll().subscribe(function (data) { return _this.nrequestss = data; }, function (error) { return _this.errorMessage = error; });
    };
    NrequestsComponent = __decorate([
        core_1.Component({
            selector: 'nrequests',
            templateUrl: './app/hitlists/nrequests.component.html',
            providers: [nrequests_service_1.NrequestsService, alertcontrol_service_1.AlertcontrolService, notationgroup_service_1.NotationgroupService]
        }),
        __metadata("design:paramtypes", [nrequests_service_1.NrequestsService,
            router_1.ActivatedRoute,
            alertcontrol_service_1.AlertcontrolService,
            notationgroup_service_1.NotationgroupService])
    ], NrequestsComponent);
    return NrequestsComponent;
}());
exports.NrequestsComponent = NrequestsComponent;
//# sourceMappingURL=nrequests.component.js.map