import { Component, OnInit } from '@angular/core';
import { User } from '../../backend/model/user';
import { UsersService } from '../../backend/services';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users: Array<User> = [];

    constructor(
        private usersService: UsersService
    ) {
    }

    ngOnInit() {
        this.usersService.getAll().subscribe(users => {
            this.users = users;
        });
    }

    addUser() {
        // TODO : Create
    }

    confirmDelete() {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            //  @TODO Delete
        }
    }
}
