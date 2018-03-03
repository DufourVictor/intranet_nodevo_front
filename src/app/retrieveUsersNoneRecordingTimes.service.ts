import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {NoneRecordingTime} from './model/noneRecordingTime';

@Injectable()
export class RetrieveUsersNoneRecordingTimesService {
    private _url = '/no_time_recordings';

    constructor(private http: HttpClient) {
    }

    getNoneRecordingTimes(): Observable<NoneRecordingTime[]> {
        return this.http.get(this._url).map(response => {
            return response['hydra:member'].map(record => {
                return new NoneRecordingTime(
                    record.id,
                    record.reason,
                    record.fromDate,
                    record.toDate,
                    record.user,
                );
            });
        });
    }
}
