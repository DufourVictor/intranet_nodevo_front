// This file should not be modified, as it can be overwritten by the generator.
// The 'LineValidators' class is here for customizations and will not be touched.

import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppValidators } from '../app-validators';
import { FormGroupValidators } from '../tools/FormGroupValidators';

export class LineValidatorsBase extends FormGroupValidators {
    label = null;
    simpleLine = [AppValidators.item];
    complexLines = [AppValidators.item];
    position = [CustomValidators.digits];
    free = [AppValidators.boolean];
    title = [AppValidators.boolean];
    quotation = [AppValidators.item];
    createdAt = [CustomValidators.date];
    updatedAt = [CustomValidators.date];
    createdBy = null;
    updatedBy = null;
}
