import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { UserQuotation } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserQuotationsService extends BackendService<UserQuotation> {
  protected get resource() { return UserQuotation._resource; }
  protected get class() { return UserQuotation; }

}
