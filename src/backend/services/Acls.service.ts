import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Acl } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class AclsService extends BackendService<Acl> {
  protected get resource() { return Acl._resource; }
  protected get class() { return Acl; }

}
