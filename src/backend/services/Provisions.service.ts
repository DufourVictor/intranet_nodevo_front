import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Provision } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProvisionsService extends BackendService<Provision> {
  protected get resource() { return Provision._resource; }
  protected get class() { return Provision; }

}
