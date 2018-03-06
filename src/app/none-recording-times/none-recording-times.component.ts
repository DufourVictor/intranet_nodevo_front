import {Component, OnInit} from '@angular/core';
import { NoTimeRecordingsService } from '../../backend/services';
import { NoTimeRecording } from '../../backend/model';

@Component({
    selector: 'app-none-recording-times',
    templateUrl: './none-recording-times.component.html',
    styleUrls: ['./none-recording-times.component.scss']
})
export class NoneRecordingTimesComponent implements OnInit {
    noneRecordingTimes: NoTimeRecording[] = [];

    constructor(
        private noTimeRecordingsService: NoTimeRecordingsService
    ) {
    }

    ngOnInit() {
        this.noTimeRecordingsService.getAll().subscribe(data => this.noneRecordingTimes = data);
    }

    add(reason, fromDate, toDate, user) {
        reason = reason.trim();
        const time = new NoTimeRecording();
        this.noTimeRecordingsService.add(
            time
        ).subscribe((noneRecordingTime) => {
            this.noneRecordingTimes.push(noneRecordingTime);
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
