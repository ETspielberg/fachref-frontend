import { NgModule } from '@angular/core';
import {UserService} from "../services/user.service";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {UsersettingsComponent} from "./usersettings.component";
import {CommonModule} from "@angular/common";
import {MultiSelectModule, SpinnerModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {usersettingsRouting} from "./usersettings.routing";

@NgModule({
    imports: [HttpModule,
        RouterModule,
        CommonModule,
        SpinnerModule,
        FormsModule,
        MultiSelectModule,
        usersettingsRouting],
    declarations: [UsersettingsComponent],
    exports: [UsersettingsComponent],
    providers: []
})

export class UsersettingsModule {}
