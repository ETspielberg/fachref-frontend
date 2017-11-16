import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersettingsComponent} from "./usersettings.component";


const routes: Routes = [
    { path: '', component: UsersettingsComponent }
];

export const usersettingsRouting: ModuleWithProviders = RouterModule.forChild(routes);