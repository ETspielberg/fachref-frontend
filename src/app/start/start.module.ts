import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {StartComponent} from "./start.component";
import {startRouting} from "./start.routing";
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        startRouting],
    declarations: [StartComponent],
    exports: [StartComponent],
    providers: []
})

export class StartModule {}
