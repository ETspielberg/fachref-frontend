import {Component, OnInit} from '@angular/core';
import {Alertcontrol} from "../model/Alertcontrol";
import {ActivatedRoute, Params, Router}   from '@angular/router';
import { Location } from '@angular/common';
import { AlertcontrolService } from '../services/alertcontrol.service';
import 'rxjs/add/operator/switchMap';
import {ProfilesPerUserService} from "../services/profilesperuser.service";
import {ProfilePerUser} from "../model/ProfilePerUser";


@Component({
    selector: 'stockcontrol-editor',
    templateUrl: 'alertcontrol.editor.component.html',
    providers: []
})
export class AlertcontrolEditorComponent  implements OnInit {

    alertcontrol : Alertcontrol;

    private profilePerUser : ProfilePerUser[];

    constructor(
private alertcontrolService : AlertcontrolService,
private route : ActivatedRoute,
private location : Location,
private router : Router,
private profilePerUserService : ProfilesPerUserService
    ){}

    ngOnInit(): void {
        this.update()
    }

    update() {
        this.route.params
            .switchMap((params: Params) => this.alertcontrolService.getAlertcontrol(params['identifier']))
            .subscribe(alertcontrol => {
              this.alertcontrol = alertcontrol;
              console.log('queried alertcontrol ' + this.alertcontrol.identifier);
            });

    }

    goBack(): void {
        this.location.back();
    }

    save(alertcontrol : Alertcontrol) {
        if (alertcontrol.identifier == 'newAlertcontrol') {
            this.alertcontrolService.create(alertcontrol).subscribe(
                res => alertcontrol = res);
        } else {
            this.alertcontrolService.update(alertcontrol).subscribe(
                res => alertcontrol = res);
         }
        this.router.navigate(['/hitlists']);
    }

    addStockcontrolUser(username : string) {
        let profilePerUser = new ProfilePerUser(this.alertcontrol.identifier,username);
        this.profilePerUserService.addProfilePerUsers(profilePerUser).subscribe(
            data => profilePerUser = data);
        this.profilePerUser.push(profilePerUser);
    }

    deleteStockcontrolUser(profilePerUser : ProfilePerUser) {
        if (profilePerUser.id != null) {
            this.profilePerUserService.deleteProfilePerUsers(profilePerUser.id).subscribe(() => {
                this.profilePerUser = this.profilePerUser.filter(scu => scu != profilePerUser);
            });
        } else {
            console.log('no id given');
        }
    }
}
