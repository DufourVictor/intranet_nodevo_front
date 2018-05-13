import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../../backend/model';
import { Form, FormService } from '../../../backend/forms';
import { CustomersService } from '../../../backend/services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
    @Input() customer: Customer = new Customer();
    form: Form<Customer>;

    constructor(
        private formService: FormService,
        private customersService: CustomersService,
        private toastr: ToastrService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.form = this.formService.makeForm<Customer>(this.customer);
    }

    save() {
        if (this.form.group.dirty && this.form.group.valid) {
            const customer = this.form.get();
            if (customer.id) {
                this.customersService.update(customer).subscribe(() => {
                    this.toastr.success('Le client a été mis à jour 👍✅', 'Succès !');
                    this.router.navigate(['/crm/customers']);
                });
            } else {
                customer.deleted = false;
                customer.enabled = true;
                this.customersService.add(customer).subscribe(() => {
                    this.toastr.success('Le client a été ajouté 👍✅', 'Succès !');
                    this.router.navigate(['crm/customers']);
                });
            }
        } else {
            this.form.displayErrors();
        }
    }
}
