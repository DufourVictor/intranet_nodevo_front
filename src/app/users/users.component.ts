import { Component, OnInit } from '@angular/core';
import { RetrieveUsersService } from '../retrieveUsers.service';
import { User } from '../model/user';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users: User[];

    constructor(private retrieveUsersService: RetrieveUsersService) {
    }

    ngOnInit() {
        this.retrieveUsersService.getUsers()
            .subscribe(data => this.users = data);
    }

    addUser() {
        alert('added');
    }

    confirmDelete() {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            //  @TODO Delete
        }
    }
}
