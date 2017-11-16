import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MediaComponent} from "./media.component";
import {SushiComponent} from "./sushi.component";
import {SushiEditorComponent} from "./sushi.editor.component";
import {CollectionManagementComponent} from "./collection.management.component";

const routes: Routes = [
    { path: '', component: MediaComponent },
    { path: 'sushi', component: SushiComponent },
    { path: 'sushi/sushiprovider/:identifier', component: SushiEditorComponent },
    { path: 'journalcollections', component: CollectionManagementComponent}
];

export const mediaRouting: ModuleWithProviders = RouterModule.forChild(routes);