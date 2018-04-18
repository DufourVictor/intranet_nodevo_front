import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { DetailQuotation } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class DetailQuotationsService extends BackendService<DetailQuotation> {
  protected get resource() { return DetailQuotation._resource; }
  protected get class() { return DetailQuotation; }

}
