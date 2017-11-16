import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {UserService} from "../services/user.service";
import {AdminComponent} from "./admin.component";
import {adminRouting} from "./admin.routing";
import {UserAdminComponent} from "./admin.userroles.component";
import {FileUploadModule, GrowlModule} from 'primeng/primeng';
import {CommonModule} from "@angular/common";
import {FileService} from "../services/file.service";

@NgModule({
    imports: [HttpModule,
        RouterModule,
        FileUploadModule,
        GrowlModule,
        CommonModule,
        adminRouting],
    declarations: [AdminComponent,UserAdminComponent],
    exports: [],
    providers: [UserService,FileService]
})

export class AdminModule {}