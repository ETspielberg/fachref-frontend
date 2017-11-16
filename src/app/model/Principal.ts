/**
 * Created by Eike on 26.06.2017.
 */

export class Principal  {

  public authenticated : boolean;

    public name : string;

    public roles : string[];

    constructor(
      name : string,
      roles : string[]
    ) {
      this.name = name;
      this.roles = roles;
      this.authenticated = false;
      if (roles.length > 0 )
        this.authenticated = true;
    }

    getName() : string {
        return this.name;
    }

}
