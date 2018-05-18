// This file should not be modified, as it can be overwritten by the generator.
// The 'CostPerYear' class is here for customizations and will not be touched.

import { User } from '../User';

export class CostPerYearBase {
  public static readonly _resource: string = 'cost_per_years';
  get _resource(): string { return CostPerYearBase._resource; };

  year: number;
  cost: number;
  comment: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  setUser(id: number): CostPerYearBase {
    this.user = new User();
    this.user.id = id;
    this.user['@id'] = '/users/' + id;
    return this;
  }

}
