import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
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

    constructor(private userService :UserService, private authentificationService : AuthentificationService, private router: Router) {
    }

    principal : Principal;

    admin : boolean;

    fachreferent : boolean;

    media : boolean;

    ngOnInit(): void {
        this.principal = this.authentificationService.principal;
        if (!(this.principal === undefined)) {
          this.admin = this.authentificationService.hasRole('admin');
          this.fachreferent = this.authentificationService.hasRole('fachreferent');
          this.media = this.authentificationService.hasRole('media');
        }
    }
}
