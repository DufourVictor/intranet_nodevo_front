import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { User } from '../backend/model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    user: User;
    opened = true;

    constructor(
        private auth: AuthentificationService,
        private router: Router
    ) {
        this.user = auth.getCurrentUser();
        this.auth.onUserSet.subscribe(user => this.user = user);
    }

    logout () {
        this.auth.logout();
        this.router.navigate(['']);
    }

    display() {
       this.opened = !this.opened;
    }
}
