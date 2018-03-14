import {Component, Input, OnInit, ViewChild } from '@angular/core';
import { NoTimeRecordingsService } from '../../backend/services';
import { NoTimeRecording, User } from '../../backend/model';
import { SpectreModalComponent } from '../spectre-modal/spectre-modal.component';

@Component({
    selector: 'app-none-recording-times',
    templateUrl: './none-recording-times.component.html',
    styleUrls: ['./none-recording-times.component.scss']
})
export class NoneRecordingTimesComponent implements OnInit {
    noneRecordingTimes: NoTimeRecording[];
    noneRecordingTime: NoTimeRecording = new NoTimeRecording();
    @Input() user: User;
    modalTitle = 'Période de non saisie des temps';
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;

    constructor(private noTimeRecordingsService: NoTimeRecordingsService) {
    }

    getAllNoneRecordingTimes() {
        this.noTimeRecordingsService.getAllBy('users', this.user.id).subscribe(data => this.noneRecordingTimes = data);

    }

    ngOnInit() {
        this.getAllNoneRecordingTimes();
    }

    activeModal(noneRecordingTime = null) {
        this.noneRecordingTime = noneRecordingTime ? noneRecordingTime : new NoTimeRecording();
        this.modalToggle.toggleActive();
    }

    closeModal() {
        this.modalToggle.toggleActive();
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
