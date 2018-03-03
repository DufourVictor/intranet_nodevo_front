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

    confirmDelete() {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            //  @TODO Delete
        }
    }

}
