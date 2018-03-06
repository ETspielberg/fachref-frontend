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
import {Message} from "primeng/primeng";
import {UsersettingsService} from "../services/usersettings.service";
import {Userinformation} from "../model/Userinformation";


@Component({
  selector: 'stockcontrol-editor',
  templateUrl: 'stockcontrol.editor.component.html',
  providers: []
})
export class StockcontrolEditorComponent implements OnInit {

  stockcontrol: Stockcontrol;

  private profilePerUsers: ProfilePerUser[];

  private user: Principal;

  msgs: Message[] = [];

  allUsers: Userinformation[];

  public filteredSimpleUsers: Userinformation[];

  public userShare: Userinformation;

  constructor(private stockcontrolService: StockcontrolService,
              private profilePerUserService: ProfilesPerUserService,
              private authentificationService: AuthentificationService,
              private usersettingsService: UsersettingsService,
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
      .subscribe(profilePerUsers => {
        this.profilePerUsers = profilePerUsers.filter(
          item => {return item.username != this.user.name;}
        );
        }, error => this.profilePerUsers = []
      );
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

  shareWithUser(user: Userinformation) {
    if (user === undefined) {
      this.msgs.push({
        severity: 'warning',
        summary: 'Kein gültiger Benutzer',
        detail: 'Es wurde kein gültiger Benutzer für die Freigabe angegeben.'
      })
    } else {
      this.addStockcontrolUser(user.username);
      this.userShare = null;
      this.msgs.push({
        severity: 'success',
        summary:'Erfolgreich',
        detail:'Das Profil wurde für ' + user.email + ' freigegeben.'
      })
    }
  }

  filterSimpleUser(event) {
    this.usersettingsService.getUserinformationStartingWith(event.query).subscribe(
      data => this.allUsers = data);
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
