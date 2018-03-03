import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './model/user';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RetrieveUsersService {
    private _url = '/users?page=1';

    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get(this._url).map(response => {
            return response['hydra:member'].map(record => {
                return new User(
                    record.id,
                    record.username,
                    record.email,
                    record.roles,
                    record.enabled,
                );
            })
        });
    }
}
