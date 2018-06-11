// This file should not be modified, as it can be overwritten by the generator.
// The 'SimpleLine' class is here for customizations and will not be touched.

import { Line } from '../Line';

export class SimpleLineBase {
  public static readonly _resource: string = 'simple_lines';
  get _resource(): string { return SimpleLineBase._resource; };

  quantity: number;
  priceHt: number;
  unit: string;
  line: Line;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  setLine(id: number): SimpleLineBase {
    this.line = new Line();
    this.line.id = id;
    this.line['@id'] = '/lines/' + id;
    return this;
  }

}
