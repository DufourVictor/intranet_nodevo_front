import { Component, OnInit } from '@angular/core';
import { Quotation } from '../../../backend/model';
import { ActivatedRoute } from '@angular/router';
import { QuotationsService } from '../../../backend/services';

@Component({
    selector: 'app-quotation-details',
    templateUrl: './quotation-details.component.html',
    styleUrls: ['./quotation-details.component.scss']
})
export class QuotationDetailsComponent implements OnInit {
    quotation: Quotation;

    constructor(
        private activatedRoute: ActivatedRoute,
        private quotationsService: QuotationsService
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params.id) {
                this.quotationsService.get(params.id).subscribe(quotation => this.quotation = quotation);
            } else {
                this.quotation = new Quotation();
            }
        });
    }

}
