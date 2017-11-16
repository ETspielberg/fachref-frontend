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

    authenticated : boolean;

    loginFailed : boolean;

    username : string;

    password : string;

    usersettings : Usersettings;

   constructor (private authentificationService : AuthentificationService, private userService : UserService) { }

    ngOnInit(): void {
     this.authentificationService.updatePrincipal().subscribe(
       data => {
         this.principal = data;
         this.userService.get(this.principal.name).subscribe(
           data => this.usersettings = data
         );
       }
     );
        if (!(this.authentificationService.principal === undefined)) {
          this.admin =this.authentificationService.hasRole('admin');
          this.fachreferent =  this.authentificationService.hasRole('fachreferent');
          this.media =  this.authentificationService.hasRole('media');
        }
    }

  login() {
    this.authentificationService.login(this.username, this.password).subscribe(
      data => {
        this.principal = data;
        this.authenticated = true;
        this.admin = this.authentificationService.hasRole('admin');
        this.fachreferent = this.authentificationService.hasRole('fachreferent');
        this.media = this.authentificationService.hasRole('media');
      }
    );
  }

  logout() {
    this.authentificationService.logout().subscribe((response: Response) => {
      if (response.status === 200) {
        this.authenticated = false;
        this.loginFailed = false;
        this.principal = new Principal("", []);
        window.location.replace(response.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
}
