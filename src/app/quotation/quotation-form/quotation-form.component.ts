import { Component, Input, OnInit } from '@angular/core';
import {
    Business,
    CGV,
    Contact,
    Customer,
    Line,
    PaymentConditions,
    Provision,
    Quotation,
    Status
} from '../../../backend/model';
import { Form, FormService } from '../../../backend/forms';
import {
    BusinessesService,
    CGVsService,
    ContactsService,
    CustomersService,
    LinesService,
    PaymentConditionsService,
    ProvisionsService,
    QuotationsService,
    StatusesService
} from '../../../backend/services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-quotation-form',
    templateUrl: './quotation-form.component.html',
    styleUrls: ['./quotation-form.component.scss']
})
export class QuotationFormComponent implements OnInit {
    static STATUS_VALIDATE = 'Accepté';
    static STATUS_REFUSE = 'Refusé';
    static STATUS_LEAVE = 'Abandonné';
    static STATUS_LOST = 'Perdu';
    @Input() quotation: Quotation = new Quotation();
    form: Form<Quotation>;
    businesses: Business[] = [];
    customers: Customer[] = [];
    contacts: Contact[] = [];
    provisions: Provision[] = [];
    status: Status[] = [];
    cgvs: CGV[] = [];
    paymentConditions: PaymentConditions[] = [];
    lines: Line[] = [];
    needReason = false;
    needSignAt = false;

    constructor(
        public formService: FormService,
        private quotationsService: QuotationsService,
        private businessesService: BusinessesService,
        private customersService: CustomersService,
        private contactsService: ContactsService,
        private provisionsService: ProvisionsService,
        private statusService: StatusesService,
        private cgvService: CGVsService,
        private paymentConditionsService: PaymentConditionsService,
        private lineService: LinesService,
        private toastr: ToastrService,
        private router: Router
    ) {
    }

    ngOnInit () {
        this.form = this.formService.makeForm<Quotation>(this.quotation);
        this.businessesService.getAllByFilter('enabled', true).subscribe((businesses) => this.businesses = businesses);
        this.customersService.getAllByFilter('deleted', false).subscribe((customers) => this.customers = customers);
        this.provisionsService.getAll().subscribe((provisions) => this.provisions = provisions);
        this.statusService.getAll().subscribe((status) => this.status = status);
        this.paymentConditionsService.getAll().subscribe((paymentConditions) => this.paymentConditions = paymentConditions);
        this.cgvService.getAll().subscribe((cgvs) => this.cgvs = cgvs);
        if (this.quotation.id) {
            this.customerChange();
        }
    }

    customerChange () {
        this.contactsService.getAllBy('customers', this.form.get().customer.id).subscribe(contacts => this.contacts = contacts);
    }

    save () {
        if (this.form.group.dirty && this.form.group.valid) {
            const quotation = this.form.get();
            quotation.lines = this.lines;
            this.getStatus(quotation);
            if (quotation.id) {
                this.quotationsService.update(quotation).subscribe(() => {
                    this.toastr.success('Le devis a été mis à jour 👍✅', 'Succès !');
                    this.router.navigate(['gescom/quotations']);
                });
            } else {
                this.quotationsService.add(quotation).subscribe(() => {
                    this.toastr.success('Le devis a été ajouté 👍✅', 'Succès !');
                    this.router.navigate(['gescom/quotations']);
                });
            }
        } else {
            this.form.displayErrors();
        }
    }

    getStatus (quotation = null) {
        const statusLabel = this.form.get().status.label;
        if (QuotationFormComponent.STATUS_VALIDATE === statusLabel) {
            this.needSignAt = true;
            if (quotation) {
                quotation.reason = null;
            }
        } else if (
            QuotationFormComponent.STATUS_REFUSE === statusLabel ||
            QuotationFormComponent.STATUS_LEAVE === statusLabel ||
            QuotationFormComponent.STATUS_LOST === statusLabel
        ) {
            this.needReason = true;
            if (quotation) {
                quotation.signAt = null;
            }
        }
    }

    onLinesChange (lines: Line[]) {
        this.form.group.markAsDirty();
        this.lines = lines;
    }
}
