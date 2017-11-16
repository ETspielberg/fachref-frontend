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
var http_1 = require("@angular/http");
var user_service_1 = require("../services/user.service");
var journal_collection_service_1 = require("../services/journal.collection.service");
var CollectionManagementComponent = (function () {
    function CollectionManagementComponent(_http, _userService, journalCollectionService) {
        this._http = _http;
        this._userService = _userService;
        this.journalCollectionService = journalCollectionService;
    }
    CollectionManagementComponent.prototype.ngOnInit = function () {
        this.getAllCollections();
    };
    CollectionManagementComponent.prototype.getAllCollections = function () {
        var _this = this;
        this.journalCollectionService.getAll().subscribe(function (res) { return _this.journalCollections = res; });
    };
    CollectionManagementComponent.prototype.deleteCollection = function (journalCollection) {
        this.journalCollectionService.delete(journalCollection.id);
    };
    CollectionManagementComponent = __decorate([
        core_1.Component({
            selector: 'journalCollections',
            templateUrl: './app/media/collection.management.component.html'
        }),
        __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService, journal_collection_service_1.JournalCollectionService])
    ], CollectionManagementComponent);
    return CollectionManagementComponent;
}());
exports.CollectionManagementComponent = CollectionManagementComponent;
//# sourceMappingURL=collection.management.component.js.map