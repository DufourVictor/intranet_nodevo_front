import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Unit } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class UnitsService extends BackendService<Unit> {
  protected get resource() { return Unit._resource; }
  protected get class() { return Unit; }

}
