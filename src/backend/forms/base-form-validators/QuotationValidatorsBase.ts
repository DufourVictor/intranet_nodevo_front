// This file should not be modified, as it can be overwritten by the generator.
// The 'QuotationValidators' class is here for customizations and will not be touched.

import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppValidators } from '../app-validators';
import { FormGroupValidators } from '../tools/FormGroupValidators';

export class QuotationValidatorsBase extends FormGroupValidators {
    codeQuotation = null;
    label = [Validators.required];
    createdAt = [CustomValidators.date];
    validedAt = [CustomValidators.date];
    enabledCgv = [AppValidators.boolean];
    customerNotes = null;
    privateNotes = null;
    amountHtArOptional = [CustomValidators.number];
    amountHtArPrincipal = [CustomValidators.number];
    totalHt = [CustomValidators.number];
    totalTva = [CustomValidators.number];
    totalTtc = [CustomValidators.number];
    cgv = [AppValidators.item];
    business = [AppValidators.item];
    status = [AppValidators.item];
    paymentConditions = [AppValidators.item];
    customerContact = [AppValidators.item];
    detailQuotation = [AppValidators.item];
    line = [AppValidators.item];
    provision = [AppValidators.item];
}
