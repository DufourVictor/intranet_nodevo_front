import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Status } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatusesService extends BackendService<Status> {
  protected get resource() { return Status._resource; }
  protected get class() { return Status; }

}
