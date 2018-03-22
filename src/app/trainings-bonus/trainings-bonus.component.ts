import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TrainingBonusesService } from '../../backend/services';
import { TrainingBonus, User } from '../../backend/model';
import { SpectreModalComponent } from '../spectre-modal/spectre-modal.component';

@Component({
    selector: 'app-trainings-bonus',
    templateUrl: './trainings-bonus.component.html',
    styleUrls: ['./trainings-bonus.component.scss']
})
export class TrainingsBonusComponent implements OnInit {
    trainingBonuses: TrainingBonus[];
    trainingBonus: TrainingBonus = new TrainingBonus();
    @Input() user: User;
    modalTitle = 'Primes ou formations';
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;

    constructor(private trainingBonusesService: TrainingBonusesService) {
    }

    getAllTraining() {
        this.trainingBonusesService.getAllBy('users', this.user.id).subscribe(data => this.trainingBonuses = data);
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
            });
        }
    }
}
