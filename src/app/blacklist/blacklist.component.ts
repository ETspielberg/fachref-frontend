import {Component, OnInit} from '@angular/core';
import {Ignored} from '../model/Ignored';
import {IgnoredService} from "../services/ignored.service";
import {SelectItem} from "primeng/primeng";
import {TranslateService} from "../translate";

@Component({
  selector: 'blacklist',
  templateUrl: 'blacklist.component.html',
  providers: []
})

export class BlacklistComponent implements OnInit {

  blacklist: Ignored[];

  show: Map<string, boolean>;

  selectedIgnoreds: Map<String,Ignored[]>;

  busy: boolean;

  selected: string;

  options: SelectItem[];

  constructor(private ignoredService: IgnoredService, private translateService: TranslateService) {
    this.show = new Map<string, boolean>();
    this.show.set('eventanalysis', true);
    this.show.set('nrequests', true);
  }

  ngOnInit(): void {
    this.selected = "";
    this.busy = true;
    this.getBlacklist();
    this.filterList();
  }

  getBlacklist() {
    this.ignoredService.getAll().subscribe(
      data => this.blacklist = data
    );
  }

  filterList() {
    this.selectedIgnoreds = new Map<String, Ignored[]>();
    this.options = [];
    for (let ignored of this.blacklist) {
      if (this.selectedIgnoreds.has(ignored.type)) {
        this.selectedIgnoreds[ignored.type].push(ignored);
      } else {
        let newList : Ignored[] = [];
        newList.push(ignored);
        this.selectedIgnoreds.set(ignored.type,newList);
        this.options.push({label:this.translateService.instant(ignored.type), value: ignored.type})
        this.selected = ignored.type;
      }
    }
    this.busy = false;
  }

  deleteIgnored(ignored: Ignored): void {
    this.ignoredService.deleteIgnored(ignored.identifier).subscribe(
      () => {
        this.blacklist.filter(ig => ig != ignored);
      });
  }
}
