import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AlertcontrolComponent} from "./alertcontrol.component";
import {AlertcontrolEditorComponent} from "./alertcontrol.editor.component";
import {NrequestsComponent} from "./nrequests.component";

const routes: Routes = [
    {path: '', component: AlertcontrolComponent },
    {path : 'hitlist/:identifier', component: AlertcontrolEditorComponent},
    {path : 'nrequests/:identifier', component: NrequestsComponent},
];

export const hitlistsRouting: ModuleWithProviders = RouterModule.forChild(routes);
