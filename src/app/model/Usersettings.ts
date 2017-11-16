/**
 * Created by Eike on 23.06.2017.
 */

export class Usersettings {

  constructor(
    public fullname : string,
    public email : string,
    public yearsToAverage : number,
    public timePeriod : number,
    public subjects : string[],
    public substitute : string[],
) {}
}
