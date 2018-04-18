import { UserBase } from './base/UserBase';

export class User extends UserBase {
    id: number;
    private _trigram: string;

    get trigram(): string {
        if (this.firstName && this.lastName) {
            return (this.firstName.substr(0, 1) + this.lastName.substr(0, 2)).toUpperCase();
        }
    }

    get fullName () {
        return this.firstName + ' ' + this.lastName;
    }

    constructor () {
        super();
        this.enabled = true;
        this.deleted = false;
    }
}
