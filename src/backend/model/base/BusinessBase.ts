// This file should not be modified, as it can be overwritten by the generator.
// The 'Business' class is here for customizations and will not be touched.

import { Contact } from '../Contact';
import { Customer } from '../Customer';

export class BusinessBase {
  public static readonly _resource: string = 'businesses';
  get _resource(): string { return BusinessBase._resource; };

  codeBusiness: string;
  arboName: string;
  label: string;
  notes: string;
  enabled: boolean;
  businessContact: Contact;
  technicalContact: Contact;
  customer: Customer;

  setBusinessContact(id: number): BusinessBase {
    this.businessContact = new Contact();
    this.businessContact.id = id;
    this.businessContact['@id'] = '/contacts/' + id;
    return this;
  }

  setTechnicalContact(id: number): BusinessBase {
    this.technicalContact = new Contact();
    this.technicalContact.id = id;
    this.technicalContact['@id'] = '/contacts/' + id;
    return this;
  }

  setCustomer(id: number): BusinessBase {
    this.customer = new Customer();
    this.customer.id = id;
    this.customer['@id'] = '/customers/' + id;
    return this;
  }

}
