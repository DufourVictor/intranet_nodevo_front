import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { User } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsersService extends BackendService<User> {
  protected get resource() { return User._resource; }
  protected get class() { return User; }

}
