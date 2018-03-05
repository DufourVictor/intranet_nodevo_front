import {Component, OnInit} from '@angular/core';
import {NoneRecordingTime} from '../model/noneRecordingTime';
import {RetrieveUsersNoneRecordingTimesService} from '../retrieveUsersNoneRecordingTimes.service';

@Component({
    selector: 'app-none-recording-times',
    templateUrl: './none-recording-times.component.html',
    styleUrls: ['./none-recording-times.component.scss']
})
export class NoneRecordingTimesComponent implements OnInit {
    noneRecordingTimes: NoneRecordingTime[];

    constructor(private retrieveUsersNoneRecordingTimesService: RetrieveUsersNoneRecordingTimesService) {
    }

    ngOnInit() {
        this.retrieveUsersNoneRecordingTimesService.getNoneRecordingTimes().subscribe(data => this.noneRecordingTimes = data);
    }

    add(reason, fromDate, toDate, user) {
        reason = reason.trim();
        this.retrieveUsersNoneRecordingTimesService.add({
            reason,
            fromDate,
            toDate,
            user
        } as NoneRecordingTime).subscribe((noneRecordingTime) => {
            this.noneRecordingTimes.push(noneRecordingTime);
        });
    }

    confirmDelete(obj) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.retrieveUsersNoneRecordingTimesService.delete(obj).subscribe(() => {
                this.noneRecordingTimes.splice(this.noneRecordingTimes.indexOf(obj), 1);
            });
        }
    }
}
