import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {Principal} from "../model/Principal";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'user',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    principal : Principal;

    guest : boolean;

    constructor(private authentificationService : AuthentificationService,
                private route : ActivatedRoute,
                private router : Router) {
    }

    ngOnInit(): void {
      this.principal = this.authentificationService.principal;
      this.guest = this.authentificationService.hasRole("guest");
    }

  logout() {
    this.authentificationService.logout().subscribe(
      data => {
        this.principal = null;
        window.location.href = "/login";
      }
    );
  }
}
