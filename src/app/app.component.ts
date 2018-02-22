import { Component } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor (private oauthService: OAuthService) {
        this.oauthService.loginUrl = 'http://localhost:8000/oauth/v2/token';
        this.oauthService.redirectUri = 'http://localhost:4200/';
        this.oauthService.clientId = '2_5c3twfevhc00wkgogggkko88s48kwgg008ookwwsoswcc408kg';
        this.oauthService.oidc = true;
        this.oauthService.setStorage(sessionStorage);
        this.oauthService.tryLogin({});
    }
}
