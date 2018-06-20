import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {JournalcounterComponent} from "./journalcounter.component";
import {EbsModelSelectionComponent} from "./ebs.model.selection.component";

const routes: Routes = [
    { path: '', component: JournalcounterComponent},
    { path: 'ebs', component: EbsModelSelectionComponent}
];

export const eJournalsRouting: ModuleWithProviders = RouterModule.forChild(routes);
