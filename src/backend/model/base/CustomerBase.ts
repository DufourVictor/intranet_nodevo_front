// This file should not be modified, as it can be overwritten by the generator.
// The 'Customer' class is here for customizations and will not be touched.

import { Business } from '../Business';

export class CustomerBase {
  public static readonly _resource: string = 'customers';
  get _resource(): string { return CustomerBase._resource; };

  codeClient: string;
  businessName: string;
  siret: string;
  street: string;
  street2: string;
  zipCode: string;
  city: string;
  phone: string;
  name: string;
  notes: string;
  enabled: boolean;
  business: Business;
  deleted: boolean;

  setBusiness(id: number): CustomerBase {
    this.business = new Business();
    this.business.id = id;
    this.business['@id'] = '/businesses/' + id;
    return this;
  }

}
