import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { OauthResponse } from '../model/OauthResponse';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private auth: AuthentificationService, private http: HttpClient) {
    }

    public login() {
        this.auth.login().subscribe((data: OauthResponse) => {
            localStorage.setItem('access_token', data.access_token);
        });
    }

    public test() {
        this.http.get('http://localhost:8000/api/demos').subscribe(
            data => {
                console.log(data);
            },
            err => {
                alert('sry');
            },
        );
    }
}
