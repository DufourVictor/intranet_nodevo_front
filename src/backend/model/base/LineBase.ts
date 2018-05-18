// This file should not be modified, as it can be overwritten by the generator.
// The 'Line' class is here for customizations and will not be touched.

import { Unit } from '../Unit';

export class LineBase {
  public static readonly _resource: string = 'lines';
  get _resource(): string { return LineBase._resource; };

  label: string;
  quantity: number;
  position: number;
  priceHt: number;
  free: boolean;
  title: boolean;
  unit: Unit;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  setUnit(id: number): LineBase {
    this.unit = new Unit();
    this.unit.id = id;
    this.unit['@id'] = '/units/' + id;
    return this;
  }

}
