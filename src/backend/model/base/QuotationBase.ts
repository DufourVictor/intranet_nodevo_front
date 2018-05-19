// This file should not be modified, as it can be overwritten by the generator.
// The 'Quotation' class is here for customizations and will not be touched.

import { CGV } from '../CGV';
import { Business } from '../Business';
import { Status } from '../Status';
import { PaymentConditions } from '../PaymentConditions';
import { Customer } from '../Customer';
import { Contact } from '../Contact';
import { Provision } from '../Provision';
import { Line } from '../Line';

export class QuotationBase {
  public static readonly _resource: string = 'quotations';
  get _resource(): string { return QuotationBase._resource; };

  codeQuotation: string;
  label: string;
  validedAt: Date;
  enabledCgv: boolean;
  customerNotes: string;
  privateNotes: string;
  signAt: Date;
  reason: string;
  cgv: CGV;
  business: Business;
  status: Status;
  paymentConditions: PaymentConditions;
  customer: Customer;
  contact: Contact;
  provision: Provision;
  lines: Line[];

  setCgv(id: number): QuotationBase {
    this.cgv = new CGV();
    this.cgv.id = id;
    this.cgv['@id'] = '/c_g_vs/' + id;
    return this;
  }

  setBusiness(id: number): QuotationBase {
    this.business = new Business();
    this.business.id = id;
    this.business['@id'] = '/businesses/' + id;
    return this;
  }

  setStatus(id: number): QuotationBase {
    this.status = new Status();
    this.status.id = id;
    this.status['@id'] = '/statuses/' + id;
    return this;
  }

  setPaymentConditions(id: number): QuotationBase {
    this.paymentConditions = new PaymentConditions();
    this.paymentConditions.id = id;
    this.paymentConditions['@id'] = '/payment_conditions/' + id;
    return this;
  }

  setCustomer(id: number): QuotationBase {
    this.customer = new Customer();
    this.customer.id = id;
    this.customer['@id'] = '/customers/' + id;
    return this;
  }

  setContact(id: number): QuotationBase {
    this.contact = new Contact();
    this.contact.id = id;
    this.contact['@id'] = '/contacts/' + id;
    return this;
  }

  setProvision(id: number): QuotationBase {
    this.provision = new Provision();
    this.provision.id = id;
    this.provision['@id'] = '/provisions/' + id;
    return this;
  }

}
