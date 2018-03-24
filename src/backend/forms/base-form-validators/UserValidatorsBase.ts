// This file should not be modified, as it can be overwritten by the generator.
// The 'UserValidators' class is here for customizations and will not be touched.

import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AppValidators } from '../app-validators';
import { FormGroupValidators } from '../tools/FormGroupValidators';

export class UserValidatorsBase extends FormGroupValidators {
    username = [Validators.required];
    password = [Validators.required];
    email = [Validators.required];
    firstName = [Validators.required];
    lastName = [Validators.required];
    enabled = [Validators.required, AppValidators.boolean];
    deleted = [Validators.required, AppValidators.boolean];
    notes = null;
    profile = [AppValidators.item];
    group = [AppValidators.item];
    managers = [AppValidators.item];
}
