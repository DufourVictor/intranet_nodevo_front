// This file should not be modified, as it can be overwritten by the generator.
// The 'FormGroupValidationMatcher' class is here for customizations and will not be touched.

import { ValidationTypes } from './tools/ValidationTypes';

import { Acl } from '../model/Acl';
import { AclValidators } from './AclValidators';
import { Group } from '../model/Group';
import { GroupValidators } from './GroupValidators';
import { NoTimeRecording } from '../model/NoTimeRecording';
import { NoTimeRecordingValidators } from './NoTimeRecordingValidators';
import { Profile } from '../model/Profile';
import { ProfileValidators } from './ProfileValidators';
import { TrainingBonus } from '../model/TrainingBonus';
import { TrainingBonusValidators } from './TrainingBonusValidators';
import { User } from '../model/User';
import { UserValidators } from './UserValidators';

export class FormGroupValidationMatcherBase {
  protected items: {[itemType: string ]: ValidationTypes};

  constructor() {
    this.setBaseItems();
    this.setItems();
  }

  setItems() {}

  setBaseItems() {
    this.items = {};
    this.items[Acl._resource] = {itemClass: Acl, validator: AclValidators};
    this.items[Group._resource] = {itemClass: Group, validator: GroupValidators};
    this.items[NoTimeRecording._resource] = {itemClass: NoTimeRecording, validator: NoTimeRecordingValidators};
    this.items[Profile._resource] = {itemClass: Profile, validator: ProfileValidators};
    this.items[TrainingBonus._resource] = {itemClass: TrainingBonus, validator: TrainingBonusValidators};
    this.items[User._resource] = {itemClass: User, validator: UserValidators};
  }

  get(itemType: string): ValidationTypes {
    if (!this.items[itemType]) {
      throw new Error('Form group validator not found for "' + itemType + '"');
    }
    return this.items[itemType];
  }
}
