import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PaymentConditions } from '../../../../backend/model';
import { Form, FormService} from '../../../../backend/forms';
import { PaymentConditionsService } from '../../../../backend/services';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-payment-conditions-form',
    templateUrl: './payment-conditions-form.component.html',
    styleUrls: ['./payment-conditions-form.component.scss']
})
export class PaymentConditionsFormComponent implements OnChanges {
    @Input() paymentConditions: PaymentConditions;
    @Output() savePaymentConditions = new EventEmitter<any>();
    formPaymentConditions: Form<PaymentConditions>;
    private _paymentConditions: PaymentConditions;

    constructor(
        protected formService: FormService,
        protected paymentConditionsService: PaymentConditionsService,
        protected toastr: ToastrService
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this._paymentConditions = changes.paymentConditions.currentValue;
        this.formPaymentConditions = this.formService.makeForm<PaymentConditions>(this._paymentConditions);
    }

    save() {
        if (this.formPaymentConditions.group.dirty && this.formPaymentConditions.group.valid) {
            const paymentCondition = this.formPaymentConditions.get();
            if (paymentCondition.id) {
                this.paymentConditionsService.update(paymentCondition).subscribe(() => {
                    this.savePaymentConditions.emit();
                    this.toastr.success(`La condition de paiement a bien été modifiée ! 👍✅`);
                });
            } else {
                this.paymentConditionsService.add(paymentCondition).subscribe(() => {
                    this.savePaymentConditions.emit();
                    this.toastr.success(`La condition de paiement a bien été ajoutée ! 👍✅`);
                });
            }
            this.formPaymentConditions.group.reset();
        } else {
            // force invalid inputs state to display errors
            this.toastr.error(`Désolé la condition de paiement n'a pas pu être mise à jour ! 😢❌`);
            this.formPaymentConditions.displayErrors();
        }
    }
}
