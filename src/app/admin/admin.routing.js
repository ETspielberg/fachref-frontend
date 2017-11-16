"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var admin_component_1 = require("./admin.component");
var admin_userroles_component_1 = require("./admin.userroles.component");
var routes = [
    { path: '', component: admin_component_1.AdminComponent },
    { path: "userAdmin", component: admin_userroles_component_1.UserAdminComponent }
];
exports.adminRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=admin.routing.js.map