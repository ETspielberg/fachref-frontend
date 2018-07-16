import {NrequestsService} from "../services/nrequests.service";
import {AlertcontrolService} from "../services/alertcontrol.service";
import {Component, OnInit} from "@angular/core";
import {Nrequests} from "../model/Nrequests";
import {ActivatedRoute, Params} from "@angular/router";
import {Alertcontrol} from "../model/Alertcontrol";
import {NotationgroupService} from "../services/notationgroup.service";
import {Notationgroup} from "../model/Notationgroup";
import {Message} from "primeng/primeng";

@Component({
    selector: 'nrequests',
    templateUrl: 'nrequests.component.html',
    providers: []
})

export class NrequestsComponent implements OnInit {

    nrequestss : Nrequests[];

    msgs: Message[];

    private identifier : string;

    alertcontrol : Alertcontrol;

    private notationgroup : Notationgroup;

    private errorMessage : string;

    busy: boolean;

    constructor(private nrequestsService:NrequestsService,
                private route : ActivatedRoute,
                private alertcontrolService : AlertcontrolService,
                private notationgroupService : NotationgroupService) { }

    ngOnInit(): void {
        this.route.params.subscribe((params : Params) => this.identifier = params['identifier']);
        this.busy = true;
        if (this.identifier == 'all') {
            this.getAllNrequests();
        } else {
          this.alertcontrolService.getAlertcontrol(this.identifier).subscribe(
            data => {
              this.alertcontrol = data;
              this.notationgroupService.get(this.alertcontrol.notationgroup).subscribe(
                data => {
                  this.notationgroup = data;
                  this.nrequestsService.getAllForRange(this.notationgroup.notationsStart, this.notationgroup.notationsEnd, this.alertcontrol.timeperiod).subscribe(
                    data => {
                      this.nrequestss = data;
                      this.busy = false;
                    },
                    error => this.errorMessage = error
                );
                },
                error => this.errorMessage = error
              )
            },
            error => this.errorMessage = error
          );
        }
    }

    getAllNrequests() : void {
    this.nrequestsService.getAll().subscribe(
        data => {
          this.nrequestss = data;
          this.busy = false;
        },
            error => this.errorMessage = error
        );
    }

  showInfo(text:string) {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Titeldaten', detail:text});
  }

  goToProtokoll(shelfmark: string) {
    let url;
    if (shelfmark.indexOf(',') > 0) {
      url = '/protokoll?shelfmark=' + shelfmark.substring(0,shelfmark.indexOf(','))
    } else {
      url = '/protokoll?shelfmark=' + shelfmark
    }
    window.open(url,'_blank');
  }
}
