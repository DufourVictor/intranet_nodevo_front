import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { ComplexLine } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class ComplexLinesService extends BackendService<ComplexLine> {
  protected get resource() { return ComplexLine._resource; }
  protected get class() { return ComplexLine; }

}
