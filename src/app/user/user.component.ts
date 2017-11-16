import {Component, OnInit} from '@angular/core';
import { UserService} from '../services/user.service';
import { Usersettings } from '../model/Usersettings'
import {AuthentificationService} from "../services/authentification.service";
import {Principal} from "../model/Principal";

@Component({
    selector: 'user',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    userData: Usersettings;

    principal : Principal;

    constructor(private userService : UserService, private authentificationService : AuthentificationService) { }

    ngOnInit(): void {
      this.principal = this.authentificationService.principal;
      if (!(this.principal === undefined)) {
        this.userService.get(this.authentificationService.principal.name).subscribe(
          usersettings => this.userData = usersettings
        );
      }
    }
}
