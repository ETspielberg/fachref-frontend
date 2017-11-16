import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {
    CalendarModule,
    DataTableModule, DialogModule, InputSwitchModule, SelectButtonModule, SpinnerModule, TabMenuModule,
    ToggleButtonModule
} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {profilesRouting} from "./profiles.routing";
import {StockcontrolComponent} from "./stockcontrol.component";
import {StockcontrolEditorComponent} from "./stockcontrol.editor.component";
import {EventanalysisComponent} from "./eventanalysis.component";
import {StockcontrolService} from "../services/stockcontrol.service";
import {EventanalysisService} from "../services/eventanalysis.service";
import {BlacklistComponent} from "./blacklist.component";
import {IgnoredService} from "../services/ignored.service";
import {ProfilesPerUserService} from "../services/profilesperuser.service";

@NgModule({
    imports: [CommonModule,
        RouterModule,
        DataTableModule,
        ToggleButtonModule,
        SpinnerModule,
        FormsModule,
        TabMenuModule,
        SelectButtonModule,
        CalendarModule,
        DialogModule,
        InputSwitchModule,
        profilesRouting],
    declarations: [StockcontrolComponent,StockcontrolEditorComponent,EventanalysisComponent,BlacklistComponent],
    exports: [StockcontrolComponent,StockcontrolEditorComponent,EventanalysisComponent],
    providers: [StockcontrolService,EventanalysisService,IgnoredService,ProfilesPerUserService]
})

export class ProfilesModule {}
