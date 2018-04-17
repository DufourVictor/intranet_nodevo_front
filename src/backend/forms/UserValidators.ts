// import { Validators } from '@angular/forms';
// import { CustomValidators } from 'ng2-validation';
// import { AppValidators } from './app-validators';
import { UserValidatorsBase } from './base-form-validators/UserValidatorsBase';
import { Validators } from '@angular/forms';
import { AppValidators } from './app-validators';

export class UserValidators extends UserValidatorsBase {
    profile = [Validators.required];
    group = [Validators.required];
    managers = [Validators.required];
    plainPassword = [Validators.required];
    password = null;
}
