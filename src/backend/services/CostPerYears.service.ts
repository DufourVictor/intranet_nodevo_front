import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { CostPerYear } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class CostPerYearsService extends BackendService<CostPerYear> {
  protected get resource() { return CostPerYear._resource; }
  protected get class() { return CostPerYear; }

}
