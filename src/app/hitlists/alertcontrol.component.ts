import { Component, OnInit } from '@angular/core';
import { Alertcontrol } from '../model/Alertcontrol';
import { AlertcontrolService } from "../services/alertcontrol.service";
import { Router } from "@angular/router";
import { UUID } from 'angular2-uuid';

@Component({
    selector: 'profiles',
    templateUrl: 'alertcontrol.component.html',
    providers: []
})
export class AlertcontrolComponent implements OnInit {
    alertcontrols : Alertcontrol[];
    errorMessage : string;

    constructor(private alertcontrolService:AlertcontrolService, private router : Router) {
    }

    ngOnInit(): void {
      this.getAlertcontrols();
    }

    getAlertcontrols() {
        this.alertcontrolService.getAllForUsername().subscribe(
            data => this.alertcontrols = data,
            error => this.errorMessage = error);
    }

    deleteAlertcontrol(alertcontrol : Alertcontrol):void {
        this.alertcontrolService.deleteAlertcontrol(alertcontrol.identifier).subscribe(() => {
            this.alertcontrols = this.alertcontrols.filter(ac => ac != alertcontrol);
        });
        this.router.navigate(['/hitlists']);
    }

    goToRss(alertcontrol : Alertcontrol) {
      const uuid = UUID.UUID();
      const url = '/rss?alertcontrol='+ alertcontrol.identifier + '&requestor=' + uuid;
      window.open(url,'_blank');
    }
}
