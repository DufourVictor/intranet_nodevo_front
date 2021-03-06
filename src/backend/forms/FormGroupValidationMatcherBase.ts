// This file should not be modified, as it can be overwritten by the generator.
// The 'FormGroupValidationMatcher' class is here for customizations and will not be touched.

import { ValidationTypes } from './tools/ValidationTypes';

import { Acl } from '../model/Acl';
import { AclValidators } from './AclValidators';
import { Business } from '../model/Business';
import { BusinessValidators } from './BusinessValidators';
import { CGV } from '../model/CGV';
import { CGVValidators } from './CGVValidators';
import { ComplexLine } from '../model/ComplexLine';
import { ComplexLineValidators } from './ComplexLineValidators';
import { Contact } from '../model/Contact';
import { ContactValidators } from './ContactValidators';
import { CostPerYear } from '../model/CostPerYear';
import { CostPerYearValidators } from './CostPerYearValidators';
import { Customer } from '../model/Customer';
import { CustomerValidators } from './CustomerValidators';
import { Group } from '../model/Group';
import { GroupValidators } from './GroupValidators';
import { Line } from '../model/Line';
import { LineValidators } from './LineValidators';
import { NoTimeRecording } from '../model/NoTimeRecording';
import { NoTimeRecordingValidators } from './NoTimeRecordingValidators';
import { PaymentConditions } from '../model/PaymentConditions';
import { PaymentConditionsValidators } from './PaymentConditionsValidators';
import { Profile } from '../model/Profile';
import { ProfileValidators } from './ProfileValidators';
import { Provision } from '../model/Provision';
import { ProvisionValidators } from './ProvisionValidators';
import { Quotation } from '../model/Quotation';
import { QuotationValidators } from './QuotationValidators';
import { SimpleLine } from '../model/SimpleLine';
import { SimpleLineValidators } from './SimpleLineValidators';
import { Status } from '../model/Status';
import { StatusValidators } from './StatusValidators';
import { TrainingBonus } from '../model/TrainingBonus';
import { TrainingBonusValidators } from './TrainingBonusValidators';
import { Type } from '../model/Type';
import { TypeValidators } from './TypeValidators';
import { Unit } from '../model/Unit';
import { UnitValidators } from './UnitValidators';
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
    this.items[Business._resource] = {itemClass: Business, validator: BusinessValidators};
    this.items[CGV._resource] = {itemClass: CGV, validator: CGVValidators};
    this.items[ComplexLine._resource] = {itemClass: ComplexLine, validator: ComplexLineValidators};
    this.items[Contact._resource] = {itemClass: Contact, validator: ContactValidators};
    this.items[CostPerYear._resource] = {itemClass: CostPerYear, validator: CostPerYearValidators};
    this.items[Customer._resource] = {itemClass: Customer, validator: CustomerValidators};
    this.items[Group._resource] = {itemClass: Group, validator: GroupValidators};
    this.items[Line._resource] = {itemClass: Line, validator: LineValidators};
    this.items[NoTimeRecording._resource] = {itemClass: NoTimeRecording, validator: NoTimeRecordingValidators};
    this.items[PaymentConditions._resource] = {itemClass: PaymentConditions, validator: PaymentConditionsValidators};
    this.items[Profile._resource] = {itemClass: Profile, validator: ProfileValidators};
    this.items[Provision._resource] = {itemClass: Provision, validator: ProvisionValidators};
    this.items[Quotation._resource] = {itemClass: Quotation, validator: QuotationValidators};
    this.items[SimpleLine._resource] = {itemClass: SimpleLine, validator: SimpleLineValidators};
    this.items[Status._resource] = {itemClass: Status, validator: StatusValidators};
    this.items[TrainingBonus._resource] = {itemClass: TrainingBonus, validator: TrainingBonusValidators};
    this.items[Type._resource] = {itemClass: Type, validator: TypeValidators};
    this.items[Unit._resource] = {itemClass: Unit, validator: UnitValidators};
    this.items[User._resource] = {itemClass: User, validator: UserValidators};
  }

  get(itemType: string): ValidationTypes {
    if (!this.items[itemType]) {
      throw new Error('Form group validator not found for "' + itemType + '"');
    }
    return this.items[itemType];
  }
}
