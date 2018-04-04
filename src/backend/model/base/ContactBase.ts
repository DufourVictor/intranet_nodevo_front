// This file should not be modified, as it can be overwritten by the generator.
// The 'Contact' class is here for customizations and will not be touched.

import { Customer } from '../Customer';
import { Type } from '../Type';

export class ContactBase {
  public static readonly _resource: string = 'contacts';
  get _resource(): string { return ContactBase._resource; };

  firstName: string;
  lastName: string;
  email: string;
  customer: Customer;
  jobFunction: string;
  phone: string;
  mobilePhone: string;
  type: Type;

  setCustomer(id: number): ContactBase {
    this.customer = new Customer();
    this.customer.id = id;
    this.customer['@id'] = '/customers/' + id;
    return this;
  }

  setType(id: number): ContactBase {
    this.type = new Type();
    this.type.id = id;
    this.type['@id'] = '/types/' + id;
    return this;
  }

}
