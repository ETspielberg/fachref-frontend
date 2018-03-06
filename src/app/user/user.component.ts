import {Component, OnInit} from '@angular/core';
import { UsersettingsService} from '../services/usersettings.service';
import { Usersettings } from '../model/Usersettings'
import {AuthentificationService} from "../services/authentification.service";
import {Principal} from "../model/Principal";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'user',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    userData: Usersettings;

    principal : Principal;

    guest : boolean;

    constructor(private userService : UsersettingsService,
                private authentificationService : AuthentificationService,
                private route : ActivatedRoute,
                private location : Location,
                private router : Router) {
    }

    ngOnInit(): void {
      this.refreshUsersettings();
    }

    refreshUsersettings() {
      this.principal = this.authentificationService.principal;
      this.guest = this.authentificationService.hasRole("guest");
      if (!(this.principal === undefined)) {
        this.userService.get(this.authentificationService.principal.name).subscribe(
          usersettings => this.userData = usersettings,
          error => this.router.navigate(['/user'])
        );
      }
    }

  logout() {
    this.authentificationService.logout().subscribe(
      data => {
        console.log(data);
        this.principal = null;
        window.location.href = "/login";
      }
    );
  }
}
