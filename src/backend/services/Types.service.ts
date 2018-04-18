import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Type } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class TypesService extends BackendService<Type> {
  protected get resource() { return Type._resource; }
  protected get class() { return Type; }

}
