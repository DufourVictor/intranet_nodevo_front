import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business, Contact, Customer } from '../../../backend/model';
import { Form, FormService } from '../../../backend/forms';
import { BusinessesService, ContactsService, CustomersService } from '../../../backend/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-business-form',
    templateUrl: './business-form.component.html',
    styleUrls: ['./business-form.component.scss']
})
export class BusinessFormComponent implements OnInit {
    static BUSINESS_CONTACT = 'Commercial';
    static TECHNICAL_CONTACT = 'Technique';
    @Input() business: Business = new Business();
    customers: Customer[] = [];
    businessContacts: Contact[] = [];
    technicalContacts: Contact[] = [];
    form: Form<Business>;

    constructor(
        protected router: Router,
        protected businessesService: BusinessesService,
        public formService: FormService,
        protected customersService: CustomersService,
        protected contactsService: ContactsService,
        protected toastr: ToastrService,
    ) {
    }

    ngOnInit() {
        this.form = this.formService.makeForm<Business>(this.business);
        this.customersService.getAllByFilter('deleted', false).subscribe(customers => this.customers = customers);
        if (this.business.id) {
            this.customerChange();
        }
    }

    customerChange() {
        this.businessContacts = [];
        this.technicalContacts = [];
        this.contactsService.getAllBy('customers', this.form.get().customer.id).subscribe(contacts => {
            contacts.forEach((contact: Contact) => {
                if (BusinessFormComponent.TECHNICAL_CONTACT === contact.type.label) {
                    this.technicalContacts.push(contact);
                }
                if (BusinessFormComponent.BUSINESS_CONTACT === contact.type.label) {
                    this.businessContacts.push(contact);
                }
            });
        });
    }

    save() {
        if (this.form.group.dirty && this.form.group.valid) {
            const business = this.form.get();
            if (business.id) {
                this.businessesService.update(business).subscribe(() => {
                    this.toastr.success('L\'affaire a été mise à jour.', 'Succès !');
                    this.router.navigate(['gescom/businesses']);
                });
            } else {
                business.enabled = true;
                business.deleted = false;
                this.businessesService.add(business).subscribe(() => {
                    this.toastr.success('L\'affaire a été ajoutée.', 'Succès !');
                    this.router.navigate(['gescom/businesses']);
                });
            }
        } else {
            this.form.displayErrors();
        }
    }

}
