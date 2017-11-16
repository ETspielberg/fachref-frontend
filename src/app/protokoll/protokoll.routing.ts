import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtokollComponent } from './protokoll.component';

const routes: Routes = [
    { path: '', component: ProtokollComponent }
];

export const protokollRouting: ModuleWithProviders = RouterModule.forChild(routes);