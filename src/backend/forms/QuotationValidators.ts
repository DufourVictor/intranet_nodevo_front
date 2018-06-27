// import { Validators } from '@angular/forms';
// import { AppValidators } from './app-validators';
import { QuotationValidatorsBase } from './base-form-validators/QuotationValidatorsBase';
import { CustomValidators } from 'ng2-validation';

export class QuotationValidators extends QuotationValidatorsBase {
    createdAt = [CustomValidators.date];
}
