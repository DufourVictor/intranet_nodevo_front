import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthentificationService } from './authentification.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    username: string;

    constructor(
        private auth: AuthentificationService,
        private router: Router
    ) {
        this.username = auth.getCurrentUser() ? auth.getCurrentUser().username : null;
        this.auth.onUserSet.subscribe(user => {
            this.username = user ? user.username : null;
        })
    }

    logout () {
        this.auth.logout();
        this.router.navigate(['']);
    }

}
