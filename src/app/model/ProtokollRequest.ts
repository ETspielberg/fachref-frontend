import {Manifestation} from "./Manifestation";

export class ProtokollRequest {

    constructor(
    public shelfmark : string,
    public collections : string,
    public materials : string,
    public exact : boolean
    ) {}
}