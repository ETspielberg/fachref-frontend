import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {UsersettingsComponent} from "./usersettings.component";
import {CommonModule} from "@angular/common";
import {ButtonModule, DropdownModule, MultiSelectModule, PasswordModule, SpinnerModule} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {usersettingsRouting} from "./usersettings.routing";
import {UserPasswordChangeComponent} from "./user.password.change.component";

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SpinnerModule,
    ButtonModule,
    FormsModule,
    MultiSelectModule,
    PasswordModule,
    DropdownModule,
    usersettingsRouting],
  declarations: [UsersettingsComponent, UserPasswordChangeComponent],
  exports: [UsersettingsComponent, UserPasswordChangeComponent],
  providers: []
})

export class UsersettingsModule {
}
