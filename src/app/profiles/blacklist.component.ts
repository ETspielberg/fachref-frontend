import { Component, OnInit } from '@angular/core';
import { Ignored } from '../model/Ignored';
import { IgnoredService } from "../services/ignored.service";
import { Router } from "@angular/router";

@Component({
    selector: 'blacklist',
    templateUrl: 'blacklist.component.html',
    providers: []
})

export class BlacklistComponent implements OnInit {
    blacklist : Ignored[];

    constructor(private ignoredService:IgnoredService, private router : Router) {
    }

    ngOnInit(): void {
        this.getBlacklist();
    }

    getBlacklist() {
        this.ignoredService.getAll().map(
            blacklist=> this.blacklist = blacklist
        );
    }

    deleteIgnored(ignored : Ignored):void {
        this.ignoredService.deleteIgnored(ignored.identifier).map(() => {
            this.blacklist.filter(ig => ig != ignored);
        });
    }
    newStockcontrol() : void {

    }
}
