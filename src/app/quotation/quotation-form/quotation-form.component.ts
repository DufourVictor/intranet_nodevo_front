import { Component, Input, OnInit } from '@angular/core';
import { Business, CGV, Contact, Customer, PaymentConditions, Provision, Quotation, Status } from '../../../backend/model';
import { Form, FormService } from '../../../backend/forms';
import {
    BusinessesService,
    CGVsService,
    ContactsService,
    CustomersService,
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
    @Input() quotation: Quotation = new Quotation();
    form: Form<Quotation>;
    businesses: Business[] = [];
    customers: Customer[] = [];
    contacts: Contact[] = [];
    provisions: Provision[] = [];
    status: Status[] = [];
    cgvs: CGV[] = [];
    paymentConditions: PaymentConditions[] = [];

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
    }

    customerChange () {
        this.contactsService.getAllBy('customers', this.form.get().customer.id).subscribe(contacts => this.contacts = contacts);
    }

    save () {
        if (this.form.group.dirty && this.form.group.valid) {
            const quotation = this.form.get();
            if (quotation.id) {
                this.quotationsService.update(quotation).subscribe(() => {
                    this.toastr.success('Le devis a été mis à jour 👍✅', 'Succès !');
                    this.router.navigate(['quotations']);
                });
            } else {
                this.quotationsService.add(quotation).subscribe(() => {
                    this.toastr.success('Le devis a été ajouté 👍✅', 'Succès !');
                    this.router.navigate(['quotations']);
                });
            }
        } else {
            this.form.displayErrors();
        }
    }
}
