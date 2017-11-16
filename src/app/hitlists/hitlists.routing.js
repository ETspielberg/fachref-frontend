"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var alertcontrol_component_1 = require("./alertcontrol.component");
var alertcontrol_editor_component_1 = require("./alertcontrol.editor.component");
var nrequests_component_1 = require("./nrequests.component");
var routes = [
    { path: '', component: alertcontrol_component_1.AlertcontrolComponent },
    { path: 'hitlist/:identifier', component: alertcontrol_editor_component_1.AlertcontrolEditorComponent },
    { path: 'nrequests/:identifier', component: nrequests_component_1.NrequestsComponent },
];
exports.hitlistsRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=hitlists.routing.js.map