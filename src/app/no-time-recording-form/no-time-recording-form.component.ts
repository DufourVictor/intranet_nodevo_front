import {Component} from '@angular/core';
import {RetrieveUsersNoneRecordingTimesService} from '../retrieveUsersNoneRecordingTimes.service';
import {NoneRecordingTime} from '../model/noneRecordingTime';

@Component({
    selector: 'app-no-time-recording-form',
    templateUrl: './no-time-recording-form.component.html',
    styleUrls: ['./no-time-recording-form.component.scss']
})
export class NoTimeRecordingFormComponent {
    constructor(private retrieveNoneRecordingTimeService: RetrieveUsersNoneRecordingTimesService) {
    }
}
