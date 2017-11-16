import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {UserService} from "../services/user.service";
import {NrequestsComponent} from "./nrequests.component";
import {AlertcontrolComponent} from "./alertcontrol.component";
import {AlertcontrolService} from "../services/alertcontrol.service";
import {NrequestsService} from "../services/nrequests.service";
import {CommonModule} from "@angular/common";
import {hitlistsRouting} from "./hitlists.routing";
import {AlertcontrolEditorComponent} from "./alertcontrol.editor.component";
import {DataTableModule, InputSwitchModule, SpinnerModule, ToggleButtonModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [HttpModule,
        CommonModule,
        RouterModule,
        DataTableModule,
        ToggleButtonModule,
        SpinnerModule,
        FormsModule,
        InputSwitchModule,
        hitlistsRouting],
    declarations: [NrequestsComponent,AlertcontrolComponent,AlertcontrolEditorComponent],
    exports: [NrequestsComponent,AlertcontrolComponent,AlertcontrolEditorComponent],
    providers: [AlertcontrolService,NrequestsService]
})

export class HitlistsModule {}
