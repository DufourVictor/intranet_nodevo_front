import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PaymentConditionsService } from '../../../backend/services';
import { PaymentConditions } from '../../../backend/model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SpectreModalComponent } from '../../spectre-modal/spectre-modal.component';
import { ToastrService } from 'ngx-toastr';
import { RoleGuardService } from '../../role-guard.service';

@Component({
    selector: 'app-payment-condition',
    templateUrl: './payment-condition.component.html',
    styleUrls: ['./payment-condition.component.scss']
})
export class PaymentConditionComponent implements OnInit {
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;

    paymentConditions: PaymentConditions[];
    paymentCondition: PaymentConditions = new PaymentConditions();
    modalTitle = 'Conditions de paiement';
    rows: PaymentConditions[] = [];
    columns = [];

    constructor(
        protected paymentConditionsService: PaymentConditionsService,
        private toastr: ToastrService,
        public roleGuard: RoleGuardService
    ) {
    }

    getAllPaymentConditions() {
        this.paymentConditionsService.getAll().subscribe(data => this.rows = this.paymentConditions = data);
    }

    ngOnInit() {
        this.getAllPaymentConditions();
        this.columns = [
            {prop: 'label', name: 'Label'},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }

    activeModal(paymentCondition = null) {
        this.paymentCondition = paymentCondition ? paymentCondition : new PaymentConditions();
        this.modalToggle.toggleActive();
    }

    closeModal() {
        this.modalToggle.toggleActive();
        this.getAllPaymentConditions();
    }

    confirmDelete(obj) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.paymentConditionsService.remove(obj).subscribe(() => {
                this.paymentConditions.splice(this.paymentConditions.indexOf(obj), 1);
                this.toastr.warning('La condition de paiement a bien été supprimée ! 😕❗️');
            });
        }
    }
}
