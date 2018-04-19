import { ContactBase } from './base/ContactBase';

export class Contact extends ContactBase {
    id: number;

    get fullName () {
        return this.firstName + ' ' + this.lastName;
    }

    getExportData() {
        return {
            lastName: this.lastName ? this.lastName : '/',
            firstName: this.firstName ? this.firstName : '/',
            customer: this.customer ? this.customer.name : '/',
            jobFunction: this.jobFunction ? this.jobFunction : '/',
            phone: this.phone ? this.phone : '/',
            email: this.email ? this.email : '/',
        };
    }
}
