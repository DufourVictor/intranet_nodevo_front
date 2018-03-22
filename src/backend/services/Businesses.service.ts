import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Business } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class BusinessesService extends BackendService<Business> {
  protected get resource() { return Business._resource; }
  protected get class() { return Business; }

}
