import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Users} from './model/users';
import {Subscription} from 'rxjs/Subscription';
import {UserInterface} from './model/user-interface';
import 'rxjs/add/operator/map';

@Injectable()
export class RetrieveUsersService {
    private _url = '/users?page=1';
    users: Users[] = [];
    // Event emitter of users
    onGetUsers = new EventEmitter();

    constructor(private http: HttpClient) {
    }

    getUsers(): Subscription {
        return this.http.get(this._url).map((res) => res).subscribe((response) => {
            console.log(response);
            response['hydra:member'].forEach((record: UserInterface) => {
                this.users.push(new Users(
                    record.id,
                    record.username,
                    record.email,
                    record.roles,
                    record.enabled,
                ));
            });
            this.onGetUsers.emit(this.users as Users[]);
        });
    }
}
