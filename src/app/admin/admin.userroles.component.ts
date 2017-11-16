import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {Principal} from "../model/Principal";

@Component({
    selector: 'admin',
    templateUrl: 'admin.userroles.component.html'
})

export class UserAdminComponent implements OnInit{

    private users : Principal[];

    constructor( private userService : UserService) {
    }

    ngOnInit(): void {
       //this.userService.getUsers().subscribe(
        //    res => this.users = res
        //)
    }

}
