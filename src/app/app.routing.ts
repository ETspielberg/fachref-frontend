import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'start', loadChildren: 'app/start/start.module#StartModule'},
  {path: 'profiles', loadChildren: 'app/profiles/profiles.module#ProfilesModule'},
  {path: 'hitlists', loadChildren: 'app/hitlists/hitlists.module#HitlistsModule'},
  {path: 'user', loadChildren: 'app/usersettings/usersettings.module#UsersettingsModule'},
  {path: 'ejournals', loadChildren: 'app/eJournals/ejournals.module#EJournalsModule'},
  {path: 'media', loadChildren: 'app/media/media.module#MediaModule'},
  {path: 'blacklist', loadChildren: 'app/blacklist/blacklist.module#BlacklistModule'},
  {path: '', redirectTo: 'start', pathMatch: 'full'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
