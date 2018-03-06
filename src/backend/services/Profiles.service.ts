import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Profile } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProfilesService extends BackendService<Profile> {
  protected get resource() { return Profile._resource; }
  protected get class() { return Profile; }

}
