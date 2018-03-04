import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { NoTimeRecording } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoTimeRecordingsService extends BackendService<NoTimeRecording> {
  protected get resource() { return NoTimeRecording._resource; }
  protected get class() { return NoTimeRecording; }

}
