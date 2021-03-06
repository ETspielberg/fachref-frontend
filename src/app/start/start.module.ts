import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {StartComponent} from "./start.component";
import {startRouting} from "./start.routing";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/primeng";
import {TranslateModule} from "../translate/translate.module";

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
      ButtonModule,
      TranslateModule,
        startRouting],
    declarations: [StartComponent],
    exports: [StartComponent],
    providers: []
})

export class StartModule {}
