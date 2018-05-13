import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TrainingBonus, User } from '../../../backend/model';
import { Form, FormService } from '../../../backend/forms';
import { TrainingBonusesService } from '../../../backend/services';
import { ToastrService } from 'ngx-toastr';

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
        private trainingBonusesService: TrainingBonusesService,
        private toastr: ToastrService
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
                this.trainingBonusesService.update(trainingBonus).subscribe(() => {
                    this.saveTraining.emit();
                    this.toastr.success(`La prime/formation a bien été mise à jour ! 👍✅`);
                });
            } else {
                trainingBonus.setUser(this.user.id);
                this.trainingBonusesService.add(trainingBonus).subscribe(() => {
                    this.saveTraining.emit();
                    this.toastr.success(`La prime/formation a bien été ajoutée ! 👍✅`);
                });
            }
            this.form.group.reset();
        } else {
            this.toastr.error(`Désolé la prime/formation n'a pas pu être mise à jour ! 😢❌`);
            // force invalid inputs state to display errors
            this.form.displayErrors();
        }
    }

}
