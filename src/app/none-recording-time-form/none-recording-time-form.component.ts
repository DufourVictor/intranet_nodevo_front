import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NoTimeRecording, User} from '../../backend/model';
import {Form, FormService} from '../../backend/forms';
import {NoTimeRecordingsService} from '../../backend/services';

@Component({
    selector: 'app-none-recording-time-form',
    templateUrl: './none-recording-time-form.component.html',
    styleUrls: ['./none-recording-time-form.component.scss']
})
export class NoneRecordingTimeFormComponent implements OnChanges {
    @Input() noneRecordingTime: NoTimeRecording;
    @Input() user: User;
    @Output() saveNoTimeRecording = new EventEmitter<any>();
    form: Form<NoTimeRecording>;
    private _noneRecordingTime: NoTimeRecording;

    constructor(
        private formService: FormService,
        private noTimeRecordingsService: NoTimeRecordingsService
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this._noneRecordingTime = changes.noneRecordingTime.currentValue;
        this.form = this.formService.makeForm<NoTimeRecording>(this._noneRecordingTime);
    }

    save() {
        if (this.form.group.dirty && this.form.group.valid) {
            const noneRecordingTime = this.form.get();
            noneRecordingTime.setUser(this.user.id);
            this.noTimeRecordingsService.add(noneRecordingTime).subscribe(() => this.saveNoTimeRecording.emit());
        } else {
            // force invalid inputs state to display errors
            this.form.displayErrors();
        }
    }
}
