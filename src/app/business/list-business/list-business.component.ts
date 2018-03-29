import { Component, Input, OnInit } from '@angular/core';
import { Business, Customer } from '../../../backend/model';
import { BusinessesService } from '../../../backend/services';

@Component({
    selector: 'app-list-business',
    templateUrl: './list-business.component.html',
    styleUrls: ['./list-business.component.scss']
})
export class ListBusinessComponent implements OnInit {
    @Input() customer: Customer = new Customer();
    businesses: Business[];

    constructor(private businessesService: BusinessesService) {
    }

    ngOnInit() {
        this.businessesService.getAllBy('customers', this.customer.id).subscribe(businesses => this.businesses = businesses);
    }

}
