// This file should not be modified, as it can be overwritten by the generator.
// The 'CustomerValidators' class is here for customizations and will not be touched.

import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppValidators } from '../app-validators';
import { FormGroupValidators } from '../tools/FormGroupValidators';

export class CustomerValidatorsBase extends FormGroupValidators {
    codeClient = [Validators.required];
    businessName = [Validators.required];
    siret = null;
    street = [Validators.required];
    street2 = null;
    zipCode = [Validators.required];
    city = [Validators.required];
    phone = null;
    name = null;
    notes = null;
    enabled = [AppValidators.boolean];
    business = [AppValidators.item];
}
