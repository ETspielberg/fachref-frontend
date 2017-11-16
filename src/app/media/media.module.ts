import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {UserService} from "../services/user.service";
import {MediaComponent} from "./media.component";
import {mediaRouting} from "./media.routing";
import {SushiComponent} from "./sushi.component";
import {SushiEditorComponent} from "./sushi.editor.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FileUploadModule, GrowlModule} from 'primeng/primeng';
import {FileService} from "../services/file.service";
import {JournalCollectionService} from "../services/journal.collection.service";
import {JournalService} from "../services/journal.service";
import {JournalTitleService} from "../services/journal.title.service";
import {CollectionManagementComponent} from "./collection.management.component";

@NgModule({
    imports: [HttpModule,
        RouterModule,
        CommonModule,
        FormsModule,
        FileUploadModule,
        GrowlModule,
        mediaRouting],
    declarations: [MediaComponent,SushiComponent,SushiEditorComponent,CollectionManagementComponent],
    exports: [],
    providers: [UserService, FileService, JournalCollectionService, JournalService, JournalTitleService]
})

export class MediaModule {}