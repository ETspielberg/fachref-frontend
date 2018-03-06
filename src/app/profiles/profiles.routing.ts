import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StockcontrolComponent} from "./stockcontrol.component";
import {StockcontrolEditorComponent} from "./stockcontrol.editor.component";
import {EventanalysisComponent} from "./eventanalysis.component";
import {BlacklistComponent} from "../blacklist/blacklist.component";


const routes: Routes = [
  {path: '', component: StockcontrolComponent},
  {path: 'profile/:identifier', component: StockcontrolEditorComponent},
  {path: 'eventanalysis/:identifier', component: EventanalysisComponent}
];

export const profilesRouting: ModuleWithProviders = RouterModule.forChild(routes);
