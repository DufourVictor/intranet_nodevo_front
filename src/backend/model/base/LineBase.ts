// This file should not be modified, as it can be overwritten by the generator.
// The 'Line' class is here for customizations and will not be touched.

import { Quotation } from '../Quotation';

export class LineBase {
  public static readonly _resource: string = 'lines';
  get _resource(): string { return LineBase._resource; };

  label: string;
  quantity: number;
  position: number;
  priceHt: number;
  free: boolean;
  title: boolean;
  unit: string;
  quotation: Quotation;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  setQuotation(id: number): LineBase {
    this.quotation = new Quotation();
    this.quotation.id = id;
    this.quotation['@id'] = '/quotations/' + id;
    return this;
  }

}
