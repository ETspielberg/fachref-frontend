import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { UserService } from "./services/user.service";
import {appRouting} from "./app.routing";
import { HttpClientModule } from '@angular/common/http';
import {ProfilesPerUserService} from "./services/profilesperuser.service";
import {NotationgroupService} from "./services/notationgroup.service";
import {GetterService} from "./services/getter.service";
import {AuthentificationService} from "./services/authentification.service";
import {APP_BASE_HREF, CommonModule,} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule ({
    imports: [
      CommonModule,
      FormsModule,
        BrowserModule,
        UserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        appRouting
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [AuthentificationService,UserService,HttpClientModule,ProfilesPerUserService,NotationgroupService,GetterService],
  exports: []
})
export class AppModule{ }
