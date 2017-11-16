import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router}   from '@angular/router';
import { Location }  from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {SushiproviderService} from "../services/sushiprovider.service";
import {Sushiprovider} from "../model/Sushiprovider";


@Component({
    selector: 'sushiprovider-editor',
    templateUrl: 'sushi.editor.component.html',
    providers: [SushiproviderService]
})
export class SushiEditorComponent  implements OnInit {

    sushiprovider : Sushiprovider;

    constructor(
        private sushiproviderService : SushiproviderService,
        private route : ActivatedRoute,
        private location : Location,
        private router : Router
    ){}

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.sushiproviderService.getSushiprovider(params['identifier']))
            .subscribe(sushiprovider => this.sushiprovider = sushiprovider);
    }

    goBack(): void {
        this.location.back();
    }

    save(sushiprovider : Sushiprovider) {
        if (sushiprovider.identifier == 'newSushiprovider') {
            this.sushiproviderService.create(sushiprovider).subscribe(
                data => this.sushiprovider = data);
        } else {
            this.sushiproviderService.update(sushiprovider);
        }
        this.router.navigate(['/media/sushi']);
    }
}
