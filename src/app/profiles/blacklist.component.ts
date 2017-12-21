import {Component, OnInit} from '@angular/core';
import {Ignored} from '../model/Ignored';
import {IgnoredService} from "../services/ignored.service";

@Component({
  selector: 'blacklist',
  templateUrl: 'blacklist.component.html',
  providers: []
})

export class BlacklistComponent implements OnInit {

  blacklist: Ignored[];

  constructor(private ignoredService: IgnoredService) {
  }

  ngOnInit(): void {
    this.getBlacklist();
  }

  getBlacklist() {
    this.ignoredService.getAll().subscribe(
      data => this.blacklist = data
    );
  }

  deleteIgnored(ignored: Ignored): void {
    this.ignoredService.deleteIgnored(ignored.identifier).subscribe(
      () => {
        this.blacklist.filter(ig => ig != ignored);
      });
  }
}
