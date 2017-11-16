import {NrequestsService} from "../services/nrequests.service";
import {AlertcontrolService} from "../services/alertcontrol.service";
import {Component, OnInit} from "@angular/core";
import {Nrequests} from "../model/Nrequests";
import {ActivatedRoute, Params} from "@angular/router";
import {Alertcontrol} from "../model/Alertcontrol";
import {NotationgroupService} from "../services/notationgroup.service";
import {Notationgroup} from "../model/Notationgroup";

@Component({
    selector: 'nrequests',
    templateUrl: 'nrequests.component.html',
    providers: []
})

export class NrequestsComponent implements OnInit {

    nrequestss : Nrequests[];

    private identifier : string;

    alertcontrol : Alertcontrol;

    private notationgroup : Notationgroup;

    private errorMessage : string;

    constructor(private nrequestsService:NrequestsService,
                private route : ActivatedRoute,
                private alertcontrolService : AlertcontrolService,
                private notationgroupService : NotationgroupService) { }

    ngOnInit(): void {
        this.route.params.subscribe((params : Params) => this.identifier = params['identifier']);
        if (this.identifier == 'all') {
            this.getAllNrequests();
        } else {
            let busy = this.alertcontrolService.getAlertcontrol(this.identifier).toPromise().then(
                alertcontrol => this.alertcontrol = alertcontrol);
            let busyTwo = busy.then( alertcontrol => this.notationgroupService.get(this.alertcontrol.notationgroup).toPromise().then(
                notationgroup => this.notationgroup = notationgroup));
            busyTwo.then( notationgroup => this.nrequestsService.getAllForRange(this.notationgroup.notationsStart,this.notationgroup.notationsEnd).subscribe(
                data => this.nrequestss = data,
                error => this.errorMessage = error));
        }
    }

    getAllNrequests() : void {
    this.nrequestsService.getAll().subscribe(
        data => this.nrequestss = data,
        error => this.errorMessage = error);
    }
}
