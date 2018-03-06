import { Component } from '@angular/core';
import { NoTimeRecording } from '../../backend/model';
import { NoTimeRecordingsService } from '../../backend/services';

@Component({
    selector: 'app-no-time-recording-form',
    templateUrl: './no-time-recording-form.component.html',
    styleUrls: ['./no-time-recording-form.component.scss']
})
export class NoTimeRecordingFormComponent {
    constructor(
        private noTimeRecordingsService: NoTimeRecordingsService
    ) {
    }
}
