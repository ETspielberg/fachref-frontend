import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {UserAdminComponent} from "./admin.userroles.component";

const routes: Routes = [
    { path: '', component: AdminComponent },
    { path: "userAdmin", component: UserAdminComponent}
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(routes);