import { Component, Input, OnInit } from '@angular/core';
import { TrainingBonusesService } from '../../backend/services';
import { TrainingBonus, User } from '../../backend/model';

@Component({
    selector: 'app-trainings-bonus',
    templateUrl: './trainings-bonus.component.html',
    styleUrls: ['./trainings-bonus.component.scss']
})
export class TrainingsBonusComponent implements OnInit {
    trainingBonuses: TrainingBonus[];
    trainingBonus: TrainingBonus = new TrainingBonus();
    @Input() user: User;
    active: string;

    constructor(private trainingBonusesService: TrainingBonusesService) {
    }

    getAllTraining() {
        this.trainingBonusesService.getAllBy('users', this.user.id).subscribe(data => this.trainingBonuses = data);
    }

    ngOnInit() {
        this.getAllTraining();
    }

    activeModal(trainingBonus = null) {
        this.active = 'active';
        if (trainingBonus !== null) {
            this.trainingBonus = trainingBonus;
        }
    }

    closeModal() {
        this.active = '';
        this.trainingBonus = new TrainingBonus();
        this.getAllTraining();
    }

    confirmDelete(obj) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.trainingBonusesService.remove(obj).subscribe(() => {
                this.trainingBonuses.splice(this.trainingBonuses.indexOf(obj), 1);
            });
        }
    }
}
