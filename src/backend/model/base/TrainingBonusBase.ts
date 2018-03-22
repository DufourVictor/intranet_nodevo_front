// This file should not be modified, as it can be overwritten by the generator.
// The 'TrainingBonus' class is here for customizations and will not be touched.

import { User } from '../User';

export class TrainingBonusBase {
  public static readonly _resource: string = 'training_bonuses';
  get _resource(): string { return TrainingBonusBase._resource; };

  type: string;
  date: Date;
  price: string;
  notes: string;
  user: User;

  setUser(id: number): TrainingBonusBase {
    this.user = new User();
    this.user.id = id;
    this.user['@id'] = '/users/' + id;
    return this;
  }

}
