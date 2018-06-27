// This file should not be modified, as it can be overwritten by the generator.
// The 'Line' class is here for customizations and will not be touched.

import { SimpleLine } from '../SimpleLine';
import { ComplexLine } from '../ComplexLine';
import { Quotation } from '../Quotation';

export class LineBase {
  public static readonly _resource: string = 'lines';
  get _resource(): string { return LineBase._resource; };

  label: string;
  simpleLine: SimpleLine;
  complexLines: ComplexLine[];
  position: number;
  free: boolean;
  title: boolean;
  quotation: Quotation;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  setSimpleLine(id: number): LineBase {
    this.simpleLine = new SimpleLine();
    this.simpleLine.id = id;
    this.simpleLine['@id'] = '/simple_lines/' + id;
    return this;
  }

  setQuotation(id: number): LineBase {
    this.quotation = new Quotation();
    this.quotation.id = id;
    this.quotation['@id'] = '/quotations/' + id;
    return this;
  }

}
