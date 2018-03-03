import {Component, OnInit} from '@angular/core';
import {RetrieveUsersService} from '../retrieveUsers.service';
import {Users} from '../model/users';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users: Users[];

    constructor(private retrieveUsersService: RetrieveUsersService) {
        this.retrieveUsersService.onGetUsers.subscribe((users: Users[]) => {
            this.users = users;
        });
    }

    ngOnInit() {
        this.retrieveUsersService.getUsers();
    }

}
