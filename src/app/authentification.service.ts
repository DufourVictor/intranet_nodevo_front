import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
let jwtDecode = require('jwt-decode');

@Injectable()
export class AuthentificationService {
    onUserSet = new EventEmitter();

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
        return this.getAccessToken() ? jwtDecode(this.getAccessToken()) : null;
    }
}
