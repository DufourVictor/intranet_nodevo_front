import { Component, Input, OnInit } from '@angular/core';
import { Business, Customer } from '../../../backend/model';
import { BusinessesService } from '../../../backend/services';

@Component({
    selector: 'app-list-user-business',
    templateUrl: './list-user-business.component.html',
    styleUrls: ['./list-user-business.component.scss']
})
export class ListUserBusinessComponent implements OnInit {
    @Input() customer: Customer;
    businesses: Business[];

    constructor(private businessesService: BusinessesService) {
    }

    ngOnInit() {
        this.businessesService.getAllBy('customers', this.customer.id).subscribe(businesses => this.businesses = businesses);
    }

}
