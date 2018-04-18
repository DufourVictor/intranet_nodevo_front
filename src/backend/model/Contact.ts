import { ContactBase } from './base/ContactBase';

export class Contact extends ContactBase {
    id: number;

    get fullName () {
        return this.firstName + ' ' + this.lastName;
    }
}
