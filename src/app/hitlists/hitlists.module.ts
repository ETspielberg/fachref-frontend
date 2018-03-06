import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {NrequestsComponent} from "./nrequests.component";
import {AlertcontrolComponent} from "./alertcontrol.component";
import {AlertcontrolService} from "../services/alertcontrol.service";
import {NrequestsService} from "../services/nrequests.service";
import {CommonModule} from "@angular/common";
import {hitlistsRouting} from "./hitlists.routing";
import {AlertcontrolEditorComponent} from "./alertcontrol.editor.component";
import {
  ButtonModule, DataTableModule, DialogModule, GrowlModule, InputSwitchModule, SpinnerModule,
  ToggleButtonModule
} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "../translate/translate.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    DataTableModule,
    ToggleButtonModule,
    SpinnerModule,
    FormsModule,
    InputSwitchModule,
    DialogModule,
    GrowlModule,
    hitlistsRouting,
    TranslateModule],
  declarations: [NrequestsComponent, AlertcontrolComponent, AlertcontrolEditorComponent],
  exports: [NrequestsComponent, AlertcontrolComponent, AlertcontrolEditorComponent],
  providers: [AlertcontrolService, NrequestsService]
})

export class HitlistsModule {
}
