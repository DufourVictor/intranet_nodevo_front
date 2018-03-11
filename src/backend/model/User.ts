import { UserBase } from './base/UserBase';

export class User extends UserBase {
    id: number;

    get trigram () {
        if (this.firstName && this.lastName) {
            return (this.firstName.substr(0, 1) + this.lastName.substr(0, 2)).toUpperCase();
        }
    }
}
