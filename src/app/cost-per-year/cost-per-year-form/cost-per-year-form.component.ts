import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CostPerYear, User } from '../../../backend/model';
import { Form, FormService } from '../../../backend/forms';
import { CostPerYearsService } from '../../../backend/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cost-per-year-form',
    templateUrl: './cost-per-year-form.component.html',
    styleUrls: ['./cost-per-year-form.component.scss']
})
export class CostPerYearFormComponent implements OnChanges {
    @Input() costPerYear: CostPerYear;
    @Input() user: User;
    @Output() saveCost = new EventEmitter<any>();
    form: Form<CostPerYear>;
    private _costPerYear: CostPerYear;

    constructor(
        private formService: FormService,
        private costPerYearsService: CostPerYearsService,
        private toastr: ToastrService
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this._costPerYear = changes.costPerYear.currentValue;
        this.form = this.formService.makeForm<CostPerYear>(this._costPerYear);
    }

    save() {
        if (this.form.group.dirty && this.form.group.valid) {
            const costPerYear = this.form.get();
            if (costPerYear.id) {
                this.costPerYearsService.update(costPerYear).subscribe(() => {
                    this.saveCost.emit();
                    this.toastr.success(`Le coût par année a bien été modifié ! 👍✅`);
                });
            } else {
                costPerYear.setUser(this.user.id);
                this.costPerYearsService.add(costPerYear).subscribe(() => {
                    this.saveCost.emit();
                    this.toastr.success(`Le coût par année a bien été ajouté ! 👍✅`);
                });
            }
            this.form.group.reset();
        } else {
            // force invalid inputs state to display errors
            this.toastr.error(`Désolé le coût par année n'a pas pu être mis à jour ! 😢❌`);
            this.form.displayErrors();
        }
    }

}
