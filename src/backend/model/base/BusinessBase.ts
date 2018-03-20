// This file should not be modified, as it can be overwritten by the generator.
// The 'Business' class is here for customizations and will not be touched.

import { User } from '../User';

export class BusinessBase {
  public static readonly _resource: string = 'businesses';
  get _resource(): string { return BusinessBase._resource; };

  arboName: string;
  label: string;
  notes: string;
  enabled: boolean;
  customer: User;

  setCustomer(id: number): BusinessBase {
    this.customer = new User();
    this.customer.id = id;
    this.customer['@id'] = '/users/' + id;
    return this;
  }

}
