// This file should not be modified, as it can be overwritten by the generator.
// The 'BusinessValidators' class is here for customizations and will not be touched.

import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppValidators } from '../app-validators';
import { FormGroupValidators } from '../tools/FormGroupValidators';

export class BusinessValidatorsBase extends FormGroupValidators {
    codeBusiness = null;
    arboName = null;
    label = null;
    notes = null;
    enabled = [AppValidators.boolean];
    businessContact = [AppValidators.item];
    technicalContact = [AppValidators.item];
    customer = [AppValidators.item];
    deleted = [AppValidators.boolean];
}
