import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Business, Quotation } from '../../../backend/model';
import { ActivatedRoute } from '@angular/router';
import { BusinessesService, QuotationsService } from '../../../backend/services';

@Component({
    selector: 'app-business-details',
    templateUrl: './business-details.component.html',
    styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit {
    business: Business;
    quotations: Quotation[];

    constructor(
        private route: ActivatedRoute,
        private businessesService: BusinessesService,
        private quotationService: QuotationsService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.businessesService.get(+params.id).subscribe(business => this.business = business);
                this.quotationService.getAll().subscribe(q => {
                    this.quotations = q.filter(qu => {
                        return qu.business && qu.business.id === +params.id;
                    });
                })
            } else {
                this.business = new Business();
            }
        });
    }

}
