import { Component, OnInit } from '@angular/core';
import { User } from '../../backend/model';
import { UsersService } from '../../backend/services';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users: User[] = [];

    constructor(
        private usersService: UsersService
    ) {
    }

    ngOnInit() {
        this.usersService.getAll().subscribe(users => this.users = users);
    }

    delete(user: User) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.usersService.remove(user).subscribe(() => {
                this.users.splice(this.users.indexOf(user), 1);
            })
        }
    }

    toggleEnabled(user: User) {
        user.enabled = !user.enabled;
        this.usersService.update(user).subscribe()
    }
}
