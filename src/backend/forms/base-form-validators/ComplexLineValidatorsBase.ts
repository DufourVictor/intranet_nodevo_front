// This file should not be modified, as it can be overwritten by the generator.
// The 'ComplexLineValidators' class is here for customizations and will not be touched.

import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppValidators } from '../app-validators';
import { FormGroupValidators } from '../tools/FormGroupValidators';

export class ComplexLineValidatorsBase extends FormGroupValidators {
    profile = [AppValidators.item];
    tjm = [CustomValidators.number];
    label = null;
    time = [CustomValidators.number];
    collaborators = [AppValidators.item];
    line = [AppValidators.item];
    createdAt = [CustomValidators.date];
    updatedAt = [CustomValidators.date];
    createdBy = null;
    updatedBy = null;
}
