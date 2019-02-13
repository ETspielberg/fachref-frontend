import {Component, OnInit} from "@angular/core";
import {Usersettings} from "../model/Usersettings";
import {UsersettingsService} from "../services/usersettings.service";
import { Location }  from '@angular/common';
import { Router} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";
import {TranslateService} from "../translate";
import {SelectItem} from "primeng/api";

@Component({
    selector: 'usersettings',
    templateUrl: 'usersettings.component.html'
})


export class UsersettingsComponent implements OnInit {

    subjects : string[];

    substitute : string[];

    usersettings: Usersettings;

  subjectIndizes: string[] = ["01", "04", "07", "10", "13", "16", "19", "22", "25", "28", "31", "34", "34", "37", "40", "43", "46a", "46b", "46c" ,"49", "52", "55", "58", "61", "64", "67", "70", "73", "75", "77", "79", "82", "85", "88", "91", "94", "99"];

  availableSubjects: SelectItem[];

  loaded: boolean = false;


    constructor(private userService: UsersettingsService,
                private authenticationService: AuthentificationService,
                private location : Location,
                private router : Router,
                private translateService: TranslateService) {
    }

    ngOnInit(): void {
      this.availableSubjects = [];
      this.subjectIndizes.forEach( entry => this.availableSubjects.push({value: entry, label: this.translateService.instant('subject.' + entry)}));
      this.userService.get(this.authenticationService.principal.name).subscribe(
        data => {
          this.usersettings = data;
          this.subjects = this.usersettings.subjects;
          this.substitute = this.usersettings.substitute;
          this.loaded = true;
        },
        error =>  this.usersettings = new Usersettings(this.authenticationService.principal.name,5,[],[])
      );
    }

    goBack(): void {
        this.location.back();
    }

    save(usersettings : Usersettings) {
        this.usersettings.subjects = this.subjects;
        this.usersettings.substitute = this.substitute;
        this.userService.create(usersettings).subscribe(
                data =>  this.router.navigate(['/start']));
    }
}
