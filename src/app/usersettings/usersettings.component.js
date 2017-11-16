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
var user_service_1 = require("../services/user.service");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var UsersettingsComponent = (function () {
    function UsersettingsComponent(userService, location, router) {
        this.userService = userService;
        this.location = location;
        this.router = router;
        this.availableSubjects = [
            { value: "01", label: "Allgemeines" },
            { value: "04", label: "Sprach- und Literaturwissenschaften" },
            { value: "07", label: "Germanistik" },
            { value: "10", label: "Anglistik" },
            { value: "13", label: "Romanistik" },
            { value: "16", label: "sonstige Philologien" },
            { value: "19", label: "Philosophie" },
            { value: "22", label: "Psychologie" },
            { value: "25", label: "Erziehungswissenschaften" },
            { value: "28", label: "Theologie" },
            { value: "31", label: "Autoren GW" },
            { value: "34", label: "Kunstwissenschaften" },
            { value: "34", label: "Medienwissenschaften" },
            { value: "37", label: "Sportwissenschaften" },
            { value: "40", label: "Geschichte" },
            { value: "43", label: "Geowissenschaften" },
            { value: "46a", label: "Sozialwissenschaften" },
            { value: "46b", label: "Soziologie" },
            { value: "46c", label: "Politikwissenschaften" },
            { value: "49", label: "Wirtschaftswissenschaften" },
            { value: "52", label: "Rechtswissenscahften" },
            { value: "55", label: "Land- und Forstwissenschaften" },
            { value: "58", label: "Naturwissenschaften" },
            { value: "61", label: "Mathematik" },
            { value: "64", label: "Informatik" },
            { value: "67", label: "Physik" },
            { value: "70", label: "Chemie" },
            { value: "73", label: "Astronomie" },
            { value: "75", label: "Biologie" },
            { value: "77", label: "Medizin" },
            { value: "79", label: "Technik allgemein" },
            { value: "82", label: "Bauingenieurwesen" },
            { value: "85", label: "Maschinenbau" },
            { value: "88", label: "Elektrotechnik" },
            { value: "91", label: "Sonstige Gebiete der Technik" },
            { value: "94", label: "Turkistik" },
            { value: "99", label: "Sonderstandorte" }
        ];
    }
    UsersettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.userService.getUser();
        var busy = this.userService.get(this.user.getName()).then(function (usersettings) { return _this.usersettings = usersettings; });
        busy.then(function (usersettings) { return _this.subjects = usersettings.subjects; });
        busy.then(function (usersettings) { return _this.substitute = _this.usersettings.substitute; });
    };
    UsersettingsComponent.prototype.goBack = function () {
        this.location.back();
    };
    UsersettingsComponent.prototype.save = function (usersettings) {
        var _this = this;
        this.usersettings.subjects = this.subjects;
        this.usersettings.substitute = this.substitute;
        this.userService.create(usersettings).subscribe(function (data) { return _this.router.navigate(['/start']); });
    };
    UsersettingsComponent = __decorate([
        core_1.Component({
            selector: 'usersettings',
            templateUrl: './app/usersettings/usersettings.component.html'
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, common_1.Location,
            router_1.Router])
    ], UsersettingsComponent);
    return UsersettingsComponent;
}());
exports.UsersettingsComponent = UsersettingsComponent;
//# sourceMappingURL=usersettings.component.js.map