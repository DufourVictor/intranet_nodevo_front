// This file should not be modified, as it can be overwritten by the generator.
// The 'Quotation' class is here for customizations and will not be touched.

import { CGV } from '../CGV';
import { Business } from '../Business';
import { Status } from '../Status';
import { PaymentConditions } from '../PaymentConditions';
import { Contact } from '../Contact';
import { DetailQuotation } from '../DetailQuotation';
import { Line } from '../Line';
import { Provision } from '../Provision';

export class QuotationBase {
  public static readonly _resource: string = 'quotations';
  get _resource(): string { return QuotationBase._resource; };

  codeQuotation: string;
  label: string;
  createdAt: Date;
  validedAt: Date;
  enabledCgv: boolean;
  customerNotes: string;
  privateNotes: string;
  amountHtArOptional: number;
  amountHtArPrincipal: number;
  totalHt: number;
  totalTva: number;
  totalTtc: number;
  cgv: CGV;
  business: Business;
  status: Status;
  paymentConditions: PaymentConditions;
  customerContact: Contact;
  detailQuotation: DetailQuotation;
  line: Line;
  provision: Provision;

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

  setCustomerContact(id: number): QuotationBase {
    this.customerContact = new Contact();
    this.customerContact.id = id;
    this.customerContact['@id'] = '/contacts/' + id;
    return this;
  }

  setDetailQuotation(id: number): QuotationBase {
    this.detailQuotation = new DetailQuotation();
    this.detailQuotation.id = id;
    this.detailQuotation['@id'] = '/detail_quotations/' + id;
    return this;
  }

  setLine(id: number): QuotationBase {
    this.line = new Line();
    this.line.id = id;
    this.line['@id'] = '/lines/' + id;
    return this;
  }

  setProvision(id: number): QuotationBase {
    this.provision = new Provision();
    this.provision.id = id;
    this.provision['@id'] = '/provisions/' + id;
    return this;
  }

}
