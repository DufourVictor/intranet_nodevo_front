import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NoTimeRecordingsService } from '../../backend/services';
import { NoTimeRecording, User } from '../../backend/model';
import { SpectreModalComponent } from '../spectre-modal/spectre-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-none-recording-times',
    templateUrl: './none-recording-times.component.html',
    styleUrls: ['./none-recording-times.component.scss']
})
export class NoneRecordingTimesComponent implements OnInit {
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;
    @ViewChild('fromDateTmpl') fromDateTmpl: TemplateRef<any>;
    @ViewChild('toDateTmpl') toDateTmpl: TemplateRef<any>;
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;

    @Input() user: User;
    noneRecordingTimes: NoTimeRecording[];
    noneRecordingTime: NoTimeRecording = new NoTimeRecording();
    modalTitle = 'Période de non saisie des temps';
    rows: NoTimeRecording[] = [];
    columns = [];

    constructor(private noTimeRecordingsService: NoTimeRecordingsService, private toastr: ToastrService) {
    }

    getAllNoneRecordingTimes() {
        this.noTimeRecordingsService.getAllBy('users', this.user.id).subscribe(
            data => this.rows = this.noneRecordingTimes = data
        );

        this.columns = [
            {prop: 'fromDate', name: 'Date début', cellTemplate: this.fromDateTmpl},
            {prop: 'toDate', name: 'Date fin', cellTemplate: this.toDateTmpl},
            {prop: 'reason', name: 'Motif'},
            {name: '', cellTemplate: this.actionTmpl},
        ];
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
                this.toastr.warning('La période de non saisie des temps bien été supprimée ! 😕❗️');
            });
        }
    }
}
