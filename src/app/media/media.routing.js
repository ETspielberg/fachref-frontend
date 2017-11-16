"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var media_component_1 = require("./media.component");
var sushi_component_1 = require("./sushi.component");
var sushi_editor_component_1 = require("./sushi.editor.component");
var collection_management_component_1 = require("./collection.management.component");
var routes = [
    { path: '', component: media_component_1.MediaComponent },
    { path: 'sushi', component: sushi_component_1.SushiComponent },
    { path: 'sushi/sushiprovider/:identifier', component: sushi_editor_component_1.SushiEditorComponent },
    { path: 'journalcollections', component: collection_management_component_1.CollectionManagementComponent }
];
exports.mediaRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=media.routing.js.map