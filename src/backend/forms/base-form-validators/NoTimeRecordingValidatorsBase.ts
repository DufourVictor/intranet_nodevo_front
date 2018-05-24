// This file should not be modified, as it can be overwritten by the generator.
// The 'NoTimeRecordingValidators' class is here for customizations and will not be touched.

import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppValidators } from '../app-validators';
import { FormGroupValidators } from '../tools/FormGroupValidators';

export class NoTimeRecordingValidatorsBase extends FormGroupValidators {
    reason = null;
    fromDate = [CustomValidators.date];
    toDate = [CustomValidators.date];
    user = [AppValidators.item];
    createdAt = [CustomValidators.date];
    updatedAt = [CustomValidators.date];
    createdBy = null;
    updatedBy = null;
}
