import {Component} from "@angular/core";

@Component({
  selector: 'passwordchange',
  templateUrl: 'user.password.change.component.html'
})
export class UserPasswordChangeComponent {

  password : string;

  passwordRepeat : string;

  identical : boolean;

  changePassword() {
    this.checkPassword();
    if (this.identical)
      console.log('new password : ' + this.passwordRepeat);
    else
      console.log('passwords do not match');
  }

  checkPassword() {
    this.identical = this.password == this.passwordRepeat;
  }

}
