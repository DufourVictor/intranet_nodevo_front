import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { CGV } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class CGVsService extends BackendService<CGV> {
  protected get resource() { return CGV._resource; }
  protected get class() { return CGV; }

}
