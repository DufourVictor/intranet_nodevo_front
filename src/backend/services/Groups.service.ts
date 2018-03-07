import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Group } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class GroupsService extends BackendService<Group> {
  protected get resource() { return Group._resource; }
  protected get class() { return Group; }

}
