import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TrainingBonus, User } from '../../../backend/model/index';
import { Form, FormService } from '../../../backend/forms/index';
import { TrainingBonusesService } from '../../../backend/services/index';

@Component({
    selector: 'app-training-bonus-form',
    templateUrl: './training-bonus-form.component.html',
    styleUrls: ['./training-bonus-form.component.scss']
})
export class TrainingBonusFormComponent implements OnChanges {
    @Input() trainingBonus: TrainingBonus;
    @Input() user: User;
    @Output() saveTraining = new EventEmitter<any>();
    form: Form<TrainingBonus>;
    private _trainingBonus: TrainingBonus;

    constructor(
        private formService: FormService,
        private trainingBonusesService: TrainingBonusesService
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this._trainingBonus = changes.trainingBonus.currentValue;
        this.form = this.formService.makeForm<TrainingBonus>(this._trainingBonus);
    }

    save() {
        if (this.form.group.dirty && this.form.group.valid) {
            const trainingBonus = this.form.get();
            if (trainingBonus.id) {
                this.trainingBonusesService.update(trainingBonus).subscribe(() => this.saveTraining.emit());
            } else {
                trainingBonus.setUser(this.user.id);
                this.trainingBonusesService.add(trainingBonus).subscribe(() => this.saveTraining.emit());
            }
            this.form.group.reset();
        } else {
            // force invalid inputs state to display errors
            this.form.displayErrors();
        }
    }

}
