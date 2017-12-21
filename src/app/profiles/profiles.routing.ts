import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StockcontrolComponent} from "./stockcontrol.component";
import {StockcontrolEditorComponent} from "./stockcontrol.editor.component";
import {EventanalysisComponent} from "./eventanalysis.component";
import {BlacklistComponent} from "./blacklist.component";


const routes: Routes = [
  {path: '', component: StockcontrolComponent},
  {path: 'profile/:identifier', component: StockcontrolEditorComponent},
  {path: 'eventanalysis/:identifier', component: EventanalysisComponent},
  {path: 'blacklist', component: BlacklistComponent}
];

export const profilesRouting: ModuleWithProviders = RouterModule.forChild(routes);
