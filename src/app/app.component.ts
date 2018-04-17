import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthentificationService } from './authentification.service';
import { User } from '../backend/model';
import { routerTransition } from './mixins/transitions/routerTransition';

@Component({
    selector: 'app-root',
    animations: [ routerTransition ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';
    user: User;
    _opened = true;

    get userFullName() {
        return `${this.user.firstName} ${this.user.lastName}`;
    }

    constructor(
        private auth: AuthentificationService,
        private router: Router
    ) {
        this.user = auth.getCurrentUser();
        this.auth.onUserSet.subscribe(user => this.user = user);
    }

    getState(outlet) {
        console.log(outlet);
        return outlet.activatedRouteData.state;
    }

    logout () {
        this.auth.logout();
        this.router.navigate(['']);
    }

    display() {
       this._opened = !this._opened;
    }
}
