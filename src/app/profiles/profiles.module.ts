import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {
  CalendarModule, TooltipModule,
  DataTableModule, DialogModule, InputSwitchModule, SelectButtonModule, SpinnerModule, TabMenuModule,
  ToggleButtonModule, ButtonModule, GrowlModule, AutoCompleteModule
} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {profilesRouting} from "./profiles.routing";
import {StockcontrolComponent} from "./stockcontrol.component";
import {StockcontrolEditorComponent} from "./stockcontrol.editor.component";
import {EventanalysisComponent} from "./eventanalysis.component";
import {StockcontrolService} from "../services/stockcontrol.service";
import {EventanalysisService} from "../services/eventanalysis.service";
import {IgnoredService} from "../services/ignored.service";
import {ProfilesPerUserService} from "../services/profilesperuser.service";
import {TranslateModule} from "../translate/translate.module";

@NgModule({
  imports: [CommonModule,
    RouterModule,
    DataTableModule,
    ToggleButtonModule,
    ButtonModule,
    SpinnerModule,
    FormsModule,
    TabMenuModule,
    TooltipModule,
    SelectButtonModule,
    CalendarModule,
    DialogModule,
    AutoCompleteModule,
    InputSwitchModule,
    TranslateModule,
    GrowlModule,
    profilesRouting],
  declarations: [StockcontrolComponent, StockcontrolEditorComponent, EventanalysisComponent],
  exports: [StockcontrolComponent, StockcontrolEditorComponent, EventanalysisComponent],
  providers: [StockcontrolService, EventanalysisService, IgnoredService, ProfilesPerUserService]
})

export class ProfilesModule {
}
