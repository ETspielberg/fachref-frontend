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
var media_component_1 = require("./media.component");
var media_routing_1 = require("./media.routing");
var sushi_component_1 = require("./sushi.component");
var sushi_editor_component_1 = require("./sushi.editor.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var primeng_1 = require("primeng/primeng");
var file_service_1 = require("../services/file.service");
var journal_collection_service_1 = require("../services/journal.collection.service");
var journal_service_1 = require("../services/journal.service");
var journal_title_service_1 = require("../services/journal.title.service");
var collection_management_component_1 = require("./collection.management.component");
var MediaModule = (function () {
    function MediaModule() {
    }
    MediaModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule,
                router_1.RouterModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                primeng_1.FileUploadModule,
                primeng_1.GrowlModule,
                media_routing_1.mediaRouting],
            declarations: [media_component_1.MediaComponent, sushi_component_1.SushiComponent, sushi_editor_component_1.SushiEditorComponent, collection_management_component_1.CollectionManagementComponent],
            exports: [],
            providers: [user_service_1.UserService, file_service_1.FileService, journal_collection_service_1.JournalCollectionService, journal_service_1.JournalService, journal_title_service_1.JournalTitleService]
        })
    ], MediaModule);
    return MediaModule;
}());
exports.MediaModule = MediaModule;
//# sourceMappingURL=media.module.js.map