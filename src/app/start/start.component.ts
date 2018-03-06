import {Component, OnInit} from "@angular/core";
import {UsersettingsService} from "../services/usersettings.service";
import {Principal} from "../model/Principal";
import {Router} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";
/**
 * Created by etspi on 25.06.2017.
 */

@Component({
    selector: 'dashboard',
    templateUrl: 'start.component.html'
})
export class StartComponent implements OnInit {

    constructor(private userService :UsersettingsService, private authentificationService : AuthentificationService, private router: Router) {
    }

    principal : Principal;

    ngOnInit(): void {
        this.principal = this.authentificationService.principal;
    }

    goTo(url: string) {
      window.location.href = '/protokoll';
    }
}
