import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Business, Customer } from '../../../backend/model';
import { BusinessesService } from '../../../backend/services';

@Component({
    selector: 'app-list-user-business',
    templateUrl: './list-user-business.component.html',
    styleUrls: ['./list-user-business.component.scss']
})
export class ListUserBusinessComponent implements OnInit {
    @ViewChild('businessContactTmpl') businessContactTmpl: TemplateRef<any>;
    @ViewChild('technicalContactTmpl') technicalContactTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;

    @Input() customer: Customer;
    businesses: Business[];
    rows: Business[] = [];
    columns = [];

    constructor(private businessesService: BusinessesService) {
    }

    ngOnInit() {
        this.businessesService.getAllBy('customers', this.customer.id).subscribe(
            businesses => this.rows = this.businesses = businesses
        );

        this.columns = [
            {prop: 'codeBusiness', name: 'Code affaire'},
            {prop: 'label', name: 'Libellé'},
            {name: 'Contact commercial', cellTemplate: this.businessContactTmpl},
            {name: 'Contact technique', cellTemplate: this.technicalContactTmpl},
            {prop: 'enabled', name: 'Statut', cellTemplate: this.enabledTmpl},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }
}
