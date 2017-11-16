import {Component} from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";
import {Principal} from "../model/Principal";

@Component({
  selector: 'logging',
  templateUrl: 'login.component.html'
})

export class LoginComponent {

  authenticated: boolean;

  error: object;

  principal: Principal;

  loginFailed: boolean;

  private username: string;

  private password: string;

  constructor(private authentificationService: AuthentificationService, private router: Router) {
  }

  login() {
    this.authentificationService.login(this.username, this.password).subscribe(
      data => {
        this.principal = data;
        this.router.navigate(['/start']);
      }
    );
  }

  logout() {
    this.authentificationService.logout().subscribe((response: Response) => {
      if (response.status === 200) {
        this.loginFailed = false;
        this.principal = new Principal("", []);
        window.location.replace(response.url);
      }
    }, (error) => {
      console.log(error);
    });
  }
}

export var principal : Principal;
