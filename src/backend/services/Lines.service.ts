import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Line } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class LinesService extends BackendService<Line> {
  protected get resource() { return Line._resource; }
  protected get class() { return Line; }

}
