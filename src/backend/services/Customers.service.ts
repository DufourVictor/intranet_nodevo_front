import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Customer } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class CustomersService extends BackendService<Customer> {
  protected get resource() { return Customer._resource; }
  protected get class() { return Customer; }

}
