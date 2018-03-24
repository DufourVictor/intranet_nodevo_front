import { Component, Input, OnInit } from '@angular/core';
import { Business, Contact, Customer } from '../../../backend/model';
import { Form, FormService } from '../../../backend/forms';
import { Router } from '@angular/router';
import { BusinessesService, ContactsService, CustomersService } from '../../../backend/services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-business-form',
    templateUrl: './business-form.component.html',
    styleUrls: ['./business-form.component.scss']
})
export class BusinessFormComponent implements OnInit {
    @Input() business: Business = new Business();
    customers: Customer[] = [];
    contacts: Contact[] = [];
    form: Form<Business>;

    constructor(
        private router: Router,
        private businessesService: BusinessesService,
        public formService: FormService,
        private customersService: CustomersService,
        private contactsService: ContactsService,
        private toastr: ToastrService,
    ) {
    }

    ngOnInit() {
        this.form = this.formService.makeForm<Business>(this.business);
        this.customersService.getAllByFilter('deleted', false).subscribe(customers => this.customers = customers);
        this.contactsService.getAll().subscribe(contacts => this.contacts = contacts);
    }

    save() {
        if (this.form.group.dirty && this.form.group.valid) {
            const business = this.form.get();
            if (business.id) {
                this.businessesService.update(business).subscribe(() => {
                    this.toastr.success('L\'affaire a été mise à jour.', 'Succès !');
                    this.router.navigate(['businesses']);
                });
            } else {
                business.enabled = true;
                this.businessesService.add(business).subscribe(() => {
                    this.toastr.success('L\'affaire a été ajoutée.', 'Succès !');
                    this.router.navigate(['businesses']);
                });
            }
        } else {
            this.form.displayErrors();
        }
    }

}
