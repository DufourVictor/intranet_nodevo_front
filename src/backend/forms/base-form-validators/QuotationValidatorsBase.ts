// This file should not be modified, as it can be overwritten by the generator.
// The 'QuotationValidators' class is here for customizations and will not be touched.

import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppValidators } from '../app-validators';
import { FormGroupValidators } from '../tools/FormGroupValidators';

export class QuotationValidatorsBase extends FormGroupValidators {
    codeQuotation = null;
    label = [Validators.required];
    validedAt = [CustomValidators.date];
    enabledCgv = [Validators.required];
    customerNotes = null;
    privateNotes = null;
    signAt = [CustomValidators.date];
    reason = null;
    cgv = [AppValidators.item];
    business = [AppValidators.item];
    status = [Validators.required];
    paymentConditions = [AppValidators.item];
    customer = [AppValidators.item];
    contact = [AppValidators.item];
    provision = [AppValidators.item];
    lines = [AppValidators.item];
}
