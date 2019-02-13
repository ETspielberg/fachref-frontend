/**
 * Created by Eike on 26.06.2017.
 */

export class Principal {

  public authenticated: boolean;

  public name: string;

  public roles: string[];

  public email: string;

  public fullname: string;

  constructor(name: string,
              roles: string[],
              email: string,
              fullname: string) {
    this.name = name;
    this.roles = roles;
    this.email = email;
    this.fullname = fullname;
    this.authenticated = false;
    if (roles.length > 0)
      this.authenticated = true;
  }
}
