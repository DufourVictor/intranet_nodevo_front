import { Component } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private oauthService: OAuthService) {
    }

    login(): void {
        this.oauthService.initImplicitFlow();
    }

    logOff(): void {
        this.oauthService.logOut();
    }
}
