import {Component, OnInit} from "@angular/core";
import {UserService} from "./services/user.service";
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

    admin : boolean;

    fachreferent : boolean;

    media : boolean;

    usersettings : Usersettings;

   constructor (private authentificationService : AuthentificationService, private userService : UserService) {  }

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
    if (!(this.principal === undefined)) {
      this.admin = this.authentificationService.hasRole('admin');
      this.fachreferent = this.authentificationService.hasRole('fachreferent');
      this.media = this.authentificationService.hasRole('media');
    }
  }

  logout() {
     this.authentificationService.logout().subscribe(
       () => {
         this.principal = null;
         this.admin = false;
         this.media = false;
         this.fachreferent = false;
         this.usersettings = null;
         window.location.href = "/login";
       }
     );
  }


}
