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
var file_service_1 = require("../services/file.service");
var MediaComponent = (function () {
    function MediaComponent(_http, _userService, fileService) {
        this._http = _http;
        this._userService = _userService;
        this.fileService = fileService;
        this.uploadedFiles = [];
    }
    MediaComponent.prototype.ngOnInit = function () {
        this.getAllFiles();
    };
    MediaComponent.prototype.getAllFiles = function () {
        var _this = this;
        this.fileService.listAllFiles("ezbUpload").subscribe(function (res) { return _this.files = res; });
    };
    MediaComponent.prototype.runEzbAnalyzer = function (file) {
        var url = 'http://localhost:11844/run/ezbAnalyzer?filename=' + file.filename;
        console.log('calling url ' + url);
        this._http.get(url).subscribe();
    };
    MediaComponent.prototype.onUpload = function (event) {
        console.log("upload event triggered");
        for (var _i = 0, _a = event.files; _i < _a.length; _i++) {
            var file = _a[_i];
            this.uploadedFiles.push(file);
            console.log("added file " + file.name);
        }
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: 'File Uploaded', detail: '' });
    };
    MediaComponent = __decorate([
        core_1.Component({
            selector: 'media',
            templateUrl: './app/media/media.component.html'
        }),
        __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService, file_service_1.FileService])
    ], MediaComponent);
    return MediaComponent;
}());
exports.MediaComponent = MediaComponent;
//# sourceMappingURL=media.component.js.map