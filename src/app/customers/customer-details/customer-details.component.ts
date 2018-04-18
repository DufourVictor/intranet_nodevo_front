import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../backend/model';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../../../backend/services';

@Component({
    selector: 'app-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
    customer: Customer;

    constructor(
        private activatedRoute: ActivatedRoute,
        private customersService: CustomersService
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params.id) {
                this.customersService.get(params.id).subscribe(customer => this.customer = customer);
            } else {
                this.customer = new Customer();
            }
        });
    }
}
