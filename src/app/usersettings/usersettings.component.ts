import {Component, OnInit} from "@angular/core";
import {Usersettings} from "../model/Usersettings";
import {UserService} from "../services/user.service";
import { Location }  from '@angular/common';
import { Router} from "@angular/router";
import {AuthentificationService} from "../services/authentification.service";

@Component({
    selector: 'usersettings',
    templateUrl: 'usersettings.component.html'
})


export class UsersettingsComponent implements OnInit {

    subjects : string[];

    substitute : string[];

    usersettings: Usersettings;

  availableSubjects = [
    {value : "01", label : "Allgemeines"},
    {value : "04", label : "Sprach- und Literaturwissenschaften"},
    {value : "07", label : "Germanistik"},
    {value : "10", label : "Anglistik"},
    {value : "13", label : "Romanistik"},
    {value : "16", label : "sonstige Philologien"},
    {value : "19", label : "Philosophie"},
    {value : "22", label : "Psychologie"},
    {value : "25", label : "Erziehungswissenschaften"},
    {value : "28", label : "Theologie"},
    {value : "31", label : "Autoren GW"},
    {value : "34", label : "Kunstwissenschaften"},
    {value : "34", label : "Medienwissenschaften"},
    {value : "37", label : "Sportwissenschaften"},
    {value : "40", label : "Geschichte"},
    {value : "43", label : "Geowissenschaften"},
    {value : "46a", label : "Sozialwissenschaften"},
    {value : "46b", label : "Soziologie"},
    {value : "46c", label : "Politikwissenschaften"},
    {value : "49", label : "Wirtschaftswissenschaften"},
    {value : "52", label : "Rechtswissenscahften"},
    {value : "55", label : "Land- und Forstwissenschaften"},
    {value : "58", label : "Naturwissenschaften"},
    {value : "61", label : "Mathematik"},
    {value : "64", label : "Informatik"},
    {value : "67", label : "Physik"},
    {value : "70", label : "Chemie"},
    {value : "73", label : "Astronomie"},
    {value : "75", label : "Biologie"},
    {value : "77", label : "Medizin"},
    {value : "79", label : "Technik allgemein"},
    {value : "82", label : "Bauingenieurwesen"},
    {value : "85", label : "Maschinenbau"},
    {value : "88", label : "Elektrotechnik"},
    {value : "91", label : "Sonstige Gebiete der Technik"},
    {value : "94", label : "Turkistik"},
    {value : "99", label : "Sonderstandorte"}
  ];


    constructor(private userService: UserService,
                private authenticationService: AuthentificationService,
                private location : Location,
                private router : Router) {
    }

    ngOnInit(): void {
      this.userService.get(this.authenticationService.principal.name).subscribe(
        data => {
          this.usersettings = data;
          this.subjects = this.usersettings.subjects;
          this.substitute = this.usersettings.substitute;
        },
        error =>  this.usersettings = new Usersettings(this.authenticationService.principal.name,'','',5,5,[],[])
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
