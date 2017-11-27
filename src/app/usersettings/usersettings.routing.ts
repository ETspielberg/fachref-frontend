import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersettingsComponent} from "./usersettings.component";
import {UserPasswordChangeComponent} from "./user.password.change.component";


const routes: Routes = [
  { path : '', component: UsersettingsComponent },
  { path : 'passwordchange', component : UserPasswordChangeComponent}
];

export const usersettingsRouting: ModuleWithProviders = RouterModule.forChild(routes);
