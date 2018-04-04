import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { PaymentConditions } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentConditionsService extends BackendService<PaymentConditions> {
  protected get resource() { return PaymentConditions._resource; }
  protected get class() { return PaymentConditions; }

}
