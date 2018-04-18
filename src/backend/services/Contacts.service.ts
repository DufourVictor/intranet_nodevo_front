import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Contact } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactsService extends BackendService<Contact> {
  protected get resource() { return Contact._resource; }
  protected get class() { return Contact; }

}
