"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var stockcontrol_component_1 = require("./stockcontrol.component");
var stockcontrol_editor_component_1 = require("./stockcontrol.editor.component");
var eventanalysis_component_1 = require("./eventanalysis.component");
var routes = [
    { path: '', component: stockcontrol_component_1.StockcontrolComponent },
    { path: 'profile/:identifier', component: stockcontrol_editor_component_1.StockcontrolEditorComponent },
    { path: 'eventanalysis/:identifier', component: eventanalysis_component_1.EventanalysisComponent },
];
exports.profilesRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=profiles.routing.js.map