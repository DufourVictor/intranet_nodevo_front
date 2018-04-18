// This file should not be modified, as it can be overwritten by the generator.
// The 'DetailQuotation' class is here for customizations and will not be touched.

import { Line } from '../Line';
import { UserQuotation } from '../UserQuotation';

export class DetailQuotationBase {
  public static readonly _resource: string = 'detail_quotations';
  get _resource(): string { return DetailQuotationBase._resource; };

  discount: string;
  optional: boolean;
  amountHt: number;
  amountHtAr: number;
  line: Line;
  userQuotation: UserQuotation;

  setLine(id: number): DetailQuotationBase {
    this.line = new Line();
    this.line.id = id;
    this.line['@id'] = '/lines/' + id;
    return this;
  }

  setUserQuotation(id: number): DetailQuotationBase {
    this.userQuotation = new UserQuotation();
    this.userQuotation.id = id;
    this.userQuotation['@id'] = '/user_quotations/' + id;
    return this;
  }

}
