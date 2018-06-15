// This file should not be modified, as it can be overwritten by the generator.
// The 'SimpleLineValidators' class is here for customizations and will not be touched.

import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppValidators } from '../app-validators';
import { FormGroupValidators } from '../tools/FormGroupValidators';

export class SimpleLineValidatorsBase extends FormGroupValidators {
    quantity = [CustomValidators.digits];
    priceHt = [CustomValidators.digits];
    unit = null;
    line = [AppValidators.item];
    createdAt = [CustomValidators.date];
    updatedAt = [CustomValidators.date];
    createdBy = null;
    updatedBy = null;
}
