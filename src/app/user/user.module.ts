import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule],
    declarations: [UserComponent],
    exports: [UserComponent],
    providers: []
})

export class UserModule {}
