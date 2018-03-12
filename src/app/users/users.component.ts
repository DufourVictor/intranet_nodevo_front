import { Component, OnInit } from '@angular/core';
import { User } from '../../backend/model';
import { UsersService } from '../../backend/services';
import { Observable } from 'rxjs/Observable';

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

    addUser() {
        // TODO : Create
    }

    delete(user: User) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.usersService.remove(user).subscribe(() => {
                this.users.splice(this.users.indexOf(user), 1);
            })
        }
    }

    toggleEnabled(user: User) {
        const clone = {...user};
        clone.enabled = !clone.enabled;
        this.usersService.update(clone as User).subscribe(
            success => user.enabled = success.enabled,
            error => console.error(error)
        );
    }
}
