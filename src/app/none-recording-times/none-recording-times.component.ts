import {Component, OnInit} from '@angular/core';
import {NoTimeRecordingsService, UsersService} from '../../backend/services';
import {NoTimeRecording, User} from '../../backend/model';

@Component({
    selector: 'app-none-recording-times',
    templateUrl: './none-recording-times.component.html',
    styleUrls: ['./none-recording-times.component.scss']
})
export class NoneRecordingTimesComponent implements OnInit {
    noneRecordingTimes: NoTimeRecording[] = [];
    active = '';
    user: User;
    constructor(
        private noTimeRecordingsService: NoTimeRecordingsService,
        private retrieveUserService: UsersService
    ) {
    }

    ngOnInit() {
        this.noTimeRecordingsService.getAll().subscribe(data => this.noneRecordingTimes = data);
        this.retrieveUserService.get(1).subscribe(user => {
            this.user = user;
        });
    }

    add(reason: string, fromDate: Date, toDate: Date) {
        reason = reason.trim();
        const time = new NoTimeRecording();
        time.reason = reason;
        time.fromDate = fromDate;
        time.toDate = toDate;
        time.user = this.user;
        this.noTimeRecordingsService.add(
            time
        ).subscribe((noneRecordingTime) => {
            this.noneRecordingTimes.push(noneRecordingTime);
            this.active = '';
        });
    }

    confirmDelete(obj) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.noTimeRecordingsService.remove(obj).subscribe(() => {
                this.noneRecordingTimes.splice(this.noneRecordingTimes.indexOf(obj), 1);
            });
        }
    }
}
