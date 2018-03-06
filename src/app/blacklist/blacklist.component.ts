import {Component, OnInit} from '@angular/core';
import {Ignored} from '../model/Ignored';
import {IgnoredService} from "../services/ignored.service";
import {Message, SelectItem} from "primeng/primeng";
import {TranslateService} from "../translate/index";

@Component({
  selector: 'blacklist',
  templateUrl: 'blacklist.component.html',
  providers: []
})

export class BlacklistComponent implements OnInit {

  blacklist: Ignored[];

  selectedIgnoreds: Map<String,Ignored[]>;

  busy: boolean;

  selected: string;

  options: SelectItem[];

  public msgs: Message[];

  constructor(private ignoredService: IgnoredService, private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.selected = "";
    this.busy = true;
    this.blacklist = [];
    this.getBlacklist();
  }

  getBlacklist() {
    this.ignoredService.getAll().subscribe(
      data => {
        this.blacklist = data;
        this.filterList();
      }
    );
  }

  filterList() {
    this.selectedIgnoreds = new Map<String, Ignored[]>();
    this.options = [];
    if (this.blacklist.length > 0) {
      for (let ignored of this.blacklist) {
        if (this.selectedIgnoreds.has(ignored.type)) {
          this.selectedIgnoreds[ignored.type].push(ignored);
        } else {
          let newList: Ignored[] = [];
          newList.push(ignored);
          this.selectedIgnoreds.set(ignored.type, newList);
          this.options.push({label: this.translateService.instant(ignored.type), value: ignored.type})
          this.selected = ignored.type;
        }
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

  updateIgnored(ignored: Ignored) {
    this.ignoredService.update(ignored).subscribe(
      data => console.log('updated ignored ' + ignored.identifier)
    )
  }
}
