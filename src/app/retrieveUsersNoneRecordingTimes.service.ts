import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {NoneRecordingTime} from './model/noneRecordingTime';
import {tap} from 'rxjs/operators';

@Injectable()
export class RetrieveUsersNoneRecordingTimesService {
    private _url = '/no_time_recordings';
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

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

    add(obj) {
        return this.http.post(this._url, obj, this.httpOptions);
    }

    delete(obj) {
        return this.http.delete(this._url + '/' + obj.id);
    }
}
