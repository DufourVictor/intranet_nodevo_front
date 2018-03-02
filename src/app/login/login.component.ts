import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: FormControl;
    password: FormControl;
    loginForm: FormGroup

    constructor(private auth: AuthentificationService, private http: HttpClient) {
    }

    ngOnInit(): void {
        this.username = new FormControl('', Validators.required);
        this.password = new FormControl('', Validators.required);

        this.loginForm = new FormGroup({
            'username': this.username,
            'password': this.password,
        });
    }

    public authenticate() {
        if (this.loginForm.valid) {
            this.auth.login(this.username.value, this.password.value).subscribe(
                (data: {token}) => {
                    localStorage.setItem('access_token', data.token);
                },
                (error) => {
                    // TODO : Display error msg for user
                    console.error(error);
                },
                () => {
                    // TODO : redirect the user on the dashboard
                    alert('logged!');
                }
            );
        }
    }
}
