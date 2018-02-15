import {Component, OnInit} from '@angular/core';
import {Stockcontrol} from "../model/Stockcontrol";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {StockcontrolService} from '../services/stockcontrol.service';
import 'rxjs/add/operator/switchMap';
import {ProfilePerUser} from "../model/ProfilePerUser";
import {ProfilesPerUserService} from "../services/profilesperuser.service";
import {Principal} from "../model/Principal";
import {AuthentificationService} from "../services/authentification.service";


@Component({
  selector: 'stockcontrol-editor',
  templateUrl: 'stockcontrol.editor.component.html',
  providers: []
})
export class StockcontrolEditorComponent implements OnInit {

  stockcontrol: Stockcontrol;

  private profilePerUsers: ProfilePerUser[];

  private user: Principal;

  constructor(private stockcontrolService: StockcontrolService,
              private profilePerUserService: ProfilesPerUserService,
              private authentificationService: AuthentificationService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.stockcontrolService.getStockcontrol(params['identifier']))
      .subscribe(stockcontrol => this.stockcontrol = stockcontrol);
    this.route.params
      .switchMap((params: Params) => this.profilePerUserService.getProfilePerUsers(params['identifier']))
      .subscribe(profilePerUsers => this.profilePerUsers = profilePerUsers,
        error => this.profilePerUsers = []);
    this.user = this.authentificationService.principal;
  }

  goBack(): void {
    this.location.back();
  }

  save(stockControl: Stockcontrol) {
    if (stockControl.identifier == 'newProfile') {
      this.stockcontrolService.create(stockControl).subscribe(
        data => {
          this.stockcontrol = data;
          this.addStockcontrolUser(this.user.name);
          console.log('saved stockcontrol ' + this.stockcontrol.identifier + ' for user ' + this.user.name);
        });
    } else {
      this.stockcontrolService.update(stockControl).subscribe(
        () => console.log('updated stockcontrol')
      );
    }
    this.router.navigate(['/profiles']);
  }


  addStockcontrolUser(username: string) {
    let profilePerUser = new ProfilePerUser(this.stockcontrol.identifier, username);
    this.profilePerUserService.addProfilePerUsers(profilePerUser).subscribe(
      data => profilePerUser = data);
    this.profilePerUsers.push(profilePerUser);
  }

  deleteStockcontrolUser(profilePerUser: ProfilePerUser) {
    if (profilePerUser.id != null) {
      this.profilePerUserService.deleteProfilePerUsers(profilePerUser.id).subscribe(() => {
        this.profilePerUsers = this.profilePerUsers.filter(scu => scu != profilePerUser);
      });
    } else {
      console.log('no id given');
    }
  }
}
