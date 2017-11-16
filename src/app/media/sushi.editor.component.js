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
require("rxjs/add/operator/switchMap");
var sushiprovider_service_1 = require("../services/sushiprovider.service");
var SushiEditorComponent = (function () {
    function SushiEditorComponent(sushiproviderService, route, location, router) {
        this.sushiproviderService = sushiproviderService;
        this.route = route;
        this.location = location;
        this.router = router;
    }
    SushiEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.sushiproviderService.getSushiprovider(params['identifier']); })
            .subscribe(function (sushiprovider) { return _this.sushiprovider = sushiprovider; });
    };
    SushiEditorComponent.prototype.goBack = function () {
        this.location.back();
    };
    SushiEditorComponent.prototype.save = function (sushiprovider) {
        var _this = this;
        if (sushiprovider.identifier == 'newSushiprovider') {
            this.sushiproviderService.create(sushiprovider).subscribe(function (data) { return _this.sushiprovider = data; });
        }
        else {
            this.sushiproviderService.update(sushiprovider);
        }
        this.router.navigate(['/media/sushi']);
    };
    SushiEditorComponent = __decorate([
        core_1.Component({
            selector: 'sushiprovider-editor',
            templateUrl: './app/media/sushi.editor.component.html',
            providers: [sushiprovider_service_1.SushiproviderService]
        }),
        __metadata("design:paramtypes", [sushiprovider_service_1.SushiproviderService,
            router_1.ActivatedRoute,
            common_1.Location,
            router_1.Router])
    ], SushiEditorComponent);
    return SushiEditorComponent;
}());
exports.SushiEditorComponent = SushiEditorComponent;
//# sourceMappingURL=sushi.editor.component.js.map