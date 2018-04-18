import { CustomerBase } from './base/CustomerBase';
import { Business } from './Business';

export class Customer extends CustomerBase {
    id: number;

    constructor() {
        super();
        this.business = new Business();
    }
}
