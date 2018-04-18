import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Quotation } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class QuotationsService extends BackendService<Quotation> {
  protected get resource() { return Quotation._resource; }
  protected get class() { return Quotation; }

}
