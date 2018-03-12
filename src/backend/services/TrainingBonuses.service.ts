import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { TrainingBonus } from '../model';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class TrainingBonusesService extends BackendService<TrainingBonus> {
  protected get resource() { return TrainingBonus._resource; }
  protected get class() { return TrainingBonus; }

}
