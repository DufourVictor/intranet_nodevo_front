import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthentificationService {
    jwtDecode = require('jwt-decode');
    onUserSet = new EventEmitter();
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<Object> {
        return this.http.post('/login_check', {username, password});
    }

    logout() {
        sessionStorage.clear();
        localStorage.clear();
        this.onUserSet.emit(this.getCurrentUser());
    }

    public getAccessToken() {
        if (sessionStorage.getItem('access_token')) {
            return sessionStorage.getItem('access_token');
        }
        return localStorage.getItem('access_token');
    }

    public setAccessToken(token, remember) {
        if (remember) {
            localStorage.setItem('access_token', token);
        } else {
            sessionStorage.setItem('access_token', token);
        }

        this.onUserSet.emit(this.getCurrentUser());
    }

    public getCurrentUser() {
        return this.getAccessToken() ? this.jwtDecode(this.getAccessToken()) : null;
    }

    public isAuthenticated(): boolean {
        return !this.jwtHelper.isTokenExpired(this.getAccessToken());
    }
}
