import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path : 'start', loadChildren : 'app/start/start.module#StartModule'},
    {path : 'profiles', loadChildren: 'app/profiles/profiles.module#ProfilesModule'},
    {path : 'protokoll', loadChildren: 'app/protokoll/protokoll.module#ProtokollModule'},
    {path : 'hitlists', loadChildren: 'app/hitlists/hitlists.module#HitlistsModule'},
    {path : 'admin', loadChildren: 'app/admin/admin.module#AdminModule'},
    {path : 'usersettings', loadChildren: 'app/usersettings/usersettings.module#UsersettingsModule'},
    {path : 'ejournals', loadChildren: 'app/eJournals/ejournals.module#EJournalsModule'},
    {path : 'media', loadChildren: 'app/media/media.module#MediaModule'},
    {path : 'login', loadChildren: 'app/login/login.module#LoginModule'},
    {path : '', redirectTo: '/start',pathMatch: 'full'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
