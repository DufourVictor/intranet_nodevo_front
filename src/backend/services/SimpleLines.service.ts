import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SimpleLine } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class SimpleLinesService extends BackendService<SimpleLine> {
  protected get resource() { return SimpleLine._resource; }
  protected get class() { return SimpleLine; }

}
