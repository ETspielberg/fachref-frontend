import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {
  CalendarModule, TooltipModule, DialogModule, InputSwitchModule, SelectButtonModule, SpinnerModule, TabMenuModule,
  ToggleButtonModule, ButtonModule, GrowlModule
} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {IgnoredService} from "../services/ignored.service";
import {TranslateModule} from "../translate/translate.module";
import {BlacklistComponent} from "./blacklist.component";
import {blacklistRouting} from "./blacklist.routing";
import {TableModule} from "primeng/table";

@NgModule({
  imports: [CommonModule,
    RouterModule,
    TableModule,
    ToggleButtonModule,
    ButtonModule,
    SpinnerModule,
    FormsModule,
    TabMenuModule,
    TooltipModule,
    SelectButtonModule,
    CalendarModule,
    DialogModule,
    InputSwitchModule,
    TranslateModule,
    GrowlModule,
    blacklistRouting],
  declarations: [BlacklistComponent],
  exports: [BlacklistComponent],
  providers: [IgnoredService]
})

export class BlacklistModule {
}
