import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlacklistComponent} from "../blacklist/blacklist.component";


const routes: Routes = [
  {path: '', component: BlacklistComponent}
];

export const blacklistRouting: ModuleWithProviders = RouterModule.forChild(routes);
