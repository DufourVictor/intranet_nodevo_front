import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TrainingBonusesService } from '../../backend/services';
import { TrainingBonus, User } from '../../backend/model';
import { SpectreModalComponent } from '../spectre-modal/spectre-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-trainings-bonus',
    templateUrl: './trainings-bonus.component.html',
    styleUrls: ['./trainings-bonus.component.scss']
})
export class TrainingsBonusComponent implements OnInit {
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;
    @ViewChild('dateTmpl') dateTmpl: TemplateRef<any>;
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;

    @Input() user: User;
    trainingBonuses: TrainingBonus[];
    trainingBonus: TrainingBonus = new TrainingBonus();
    modalTitle = 'Primes ou formations';
    rows: TrainingBonus[] = [];
    columns = [];

    constructor(private trainingBonusesService: TrainingBonusesService, private toastr: ToastrService) {
    }

    getAllTraining() {
        this.trainingBonusesService.getAllBy('users', this.user.id).subscribe(
            data => this.rows = this.trainingBonuses = data
        );

        this.columns = [
            {prop: 'type', name: 'Type'},
            {prop: 'date', name: 'Date', cellTemplate: this.dateTmpl},
            {prop: 'price', name: 'Coût'},
            {prop: 'notes', name: 'Note'},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }

    ngOnInit() {
        this.getAllTraining();
    }

    activeModal(trainingBonus = null) {
        this.trainingBonus = trainingBonus ? trainingBonus : new TrainingBonus();
        this.modalToggle.toggleActive();
    }

    closeModal() {
        this.modalToggle.toggleActive();
        this.getAllTraining();
    }

    confirmDelete(obj) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.trainingBonusesService.remove(obj).subscribe(() => {
                this.trainingBonuses.splice(this.trainingBonuses.indexOf(obj), 1);
                this.toastr.warning('La prime/formation bien été supprimée ! 😕❗️');
            });
        }
    }
}
