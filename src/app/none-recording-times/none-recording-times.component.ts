import { Component, Input, OnInit } from '@angular/core';
import { NoTimeRecordingsService } from '../../backend/services';
import { NoTimeRecording, User } from '../../backend/model';

@Component({
    selector: 'app-none-recording-times',
    templateUrl: './none-recording-times.component.html',
    styleUrls: ['./none-recording-times.component.scss']
})
export class NoneRecordingTimesComponent implements OnInit {
    noneRecordingTimes: NoTimeRecording[];
    noneRecordingTime: NoTimeRecording = new NoTimeRecording();
    @Input() user: User;
    active: string;

    constructor(private noTimeRecordingsService: NoTimeRecordingsService) {
    }

    getAllNoneRecordingTimes() {
        this.noTimeRecordingsService.getAllBy('users', this.user.id).subscribe(data => this.noneRecordingTimes = data);

    }

    ngOnInit() {
        this.getAllNoneRecordingTimes();
    }

    activeModal(noneRecordingTime = null) {
        this.active = 'active';
        if (noneRecordingTime !== null) {
            this.noneRecordingTime = noneRecordingTime;
        }
    }

    closeModal() {
        this.active = '';
        this.noneRecordingTime = new NoTimeRecording();
        this.getAllNoneRecordingTimes();
    }

    confirmDelete(obj) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.noTimeRecordingsService.remove(obj).subscribe(() => {
                this.noneRecordingTimes.splice(this.noneRecordingTimes.indexOf(obj), 1);
            });
        }
    }
}
