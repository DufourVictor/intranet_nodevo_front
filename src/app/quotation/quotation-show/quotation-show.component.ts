import { Component, OnInit } from '@angular/core';
import { Quotation } from '../../../backend/model';
import { QuotationsService } from '../../../backend/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quotation-show',
  templateUrl: './quotation-show.component.html',
  styleUrls: ['./quotation-show.component.scss']
})
export class QuotationShowComponent implements OnInit {
    quotation: Quotation;

    constructor(
        private activatedRoute: ActivatedRoute,
        private quotationsService: QuotationsService
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
                this.quotationsService.get(params.id).subscribe(quotation => this.quotation = quotation);
        });
    }
}
