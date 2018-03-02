import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthentificationService {

    constructor(private http: HttpClient) {
    }

    login (username: string, password: string): Observable<Object> {
        return this.http.post('/login_check', {username, password})
    }

    public getAccessToken() {
        return localStorage.getItem('access_token');
    }
}
