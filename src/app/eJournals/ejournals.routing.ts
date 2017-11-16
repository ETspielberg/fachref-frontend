import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {JournalcounterComponent} from "./journalcounter.component";

const routes: Routes = [
    { path: '', component: JournalcounterComponent }
];

export const eJournalsRouting: ModuleWithProviders = RouterModule.forChild(routes);