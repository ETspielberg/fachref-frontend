import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {LoginComponent, principal} from "./login.component";
import {loginRouting} from "./login.routing";
import {AuthentificationService} from "../services/authentification.service";

@NgModule({
  imports: [CommonModule,
    RouterModule,
    FormsModule,
    loginRouting],
  declarations: [LoginComponent],
  exports: [],
  providers: []
})

export class LoginModule {}
