import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    username: string;

    constructor(private auth: AuthentificationService) {
        const jwt = auth.getCurrentUser();
        this.username = jwt.username;
    }
}
