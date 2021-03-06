import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { UsersettingsService } from "./services/usersettings.service";
import {appRouting} from "./app.routing";
import { HttpClientModule } from '@angular/common/http';
import {ProfilesPerUserService} from "./services/profilesperuser.service";
import {NotationgroupService} from "./services/notationgroup.service";
import {AuthentificationService} from "./services/authentification.service";
import {CommonModule,} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "./translate/translate.module";
import {TranslatePipe, TranslateService} from "./translate";
import {ButtonModule, InputTextModule} from "primeng/primeng";

@NgModule ({
    imports: [
      CommonModule,
      FormsModule,
      BrowserModule,
      UserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      TranslateModule,
      ButtonModule,
      InputTextModule,
      appRouting
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [AuthentificationService,UsersettingsService,HttpClientModule,ProfilesPerUserService,NotationgroupService, TranslateService],
  exports: []
})
export class AppModule{ }
