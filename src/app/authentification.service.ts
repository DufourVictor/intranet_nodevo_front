import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthentificationService {

    constructor(private http: HttpClient) {
    }

    public login() {
        return this.http.post('http://localhost:8000/oauth/v2/token', {
            grant_type: 'password',
            client_id: '1_191vpnu6i16scsggcgk0wk8cks80kwgsgg00o0ko0gc8k80ow4',
            client_secret: '2cfvdatufbvo4osc4oc4sc8884c40wgc8kwksgo4wkw4ck0koc',
            username: 'admin',
            password: 'admin'
        });
    }

    public getAccessToken() {
        return localStorage.getItem('access_token');
    }
}
