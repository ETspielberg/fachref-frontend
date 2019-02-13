/**
 * Created by Eike on 23.06.2017.
 */

export class Usersettings {

  constructor(
    public username: string,
    public timePeriod: number,
    public subjects: string[],
    public substitute: string[]
) {}
}
