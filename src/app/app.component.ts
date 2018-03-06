import {Component, OnInit} from "@angular/core";
import {UsersettingsService} from "./services/usersettings.service";
import {Principal} from "./model/Principal";
import $ from 'bootstrap';
import {AuthentificationService} from "./services/authentification.service";
import {Usersettings} from "./model/Usersettings";

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

    principal : Principal;

    usersettings : Usersettings;

   constructor (private authentificationService : AuthentificationService, private userService : UsersettingsService) {  }

    ngOnInit(): void {
      this.authentificationService.updatePrincipal().subscribe(
        data => {
          this.principal = data;
          this.refreshUser();
          this.userService.get(this.principal.name).subscribe(
            data => this.usersettings = data
          );
        },
        error => console.log(error)
      );
    }

  refreshUser() {
    this.principal = this.authentificationService.principal;
  }
}
