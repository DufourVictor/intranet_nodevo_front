import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Quotation } from '../../../backend/model';
import { QuotationsService } from '../../../backend/services';
import { ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-quotation-show',
  templateUrl: './quotation-show.component.html',
  styleUrls: ['./quotation-show.component.scss']
})
export class QuotationShowComponent implements OnInit {
    @ViewChild('pdf') pdf: ElementRef;
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

    exportPdf() {
        const pdf = new jsPDF();
        const content = this.pdf.nativeElement;
        pdf.fromHTML(content.innerHTML, 15, 15, {});
        pdf.save('test.pdf');
    }
}
