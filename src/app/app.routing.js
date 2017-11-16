"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var routes = [
    { path: 'start', loadChildren: 'app/start/start.module#StartModule' },
    { path: 'profiles', loadChildren: 'app/profiles/profiles.module#ProfilesModule' },
    { path: 'protokoll', loadChildren: 'app/protokoll/protokoll.module#ProtokollModule' },
    { path: 'hitlists', loadChildren: 'app/hitlists/hitlists.module#HitlistsModule' },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'usersettings', loadChildren: 'app/usersettings/usersettings.module#UsersettingsModule' },
    { path: 'ejournals', loadChildren: 'app/eJournals/ejournals.module#EJournalsModule' },
    { path: 'media', loadChildren: 'app/media/media.module#MediaModule' },
    { path: '', redirectTo: '/start', pathMatch: 'full' }
];
exports.appRouting = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map