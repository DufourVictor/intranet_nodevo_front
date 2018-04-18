import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Quotation } from '../../backend/model';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { QuotationsService } from '../../backend/services';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    quotations: Quotation[] = [];
    rows: Quotation[] = [];
    columns = [];

    constructor(
        private quotationService: QuotationsService,
        private toastr: ToastrService,
    ) {
    }

    ngOnInit() {
        this.quotationService.getAll().subscribe(data => this.quotations = this.rows = data);
        this.columns = [
            {prop: 'codeQuotation', name: 'Code devis'},
            {prop: 'label', name: 'Intitulé du devis'},
            {prop: 'business.label', name: 'Affaire'},
            {prop: 'customer.name', name: 'Client'},
            {prop: 'provision.label', name: 'Type de prestation'},
            {prop: 'totalHt', name: 'Prix HT'},
            {prop: 'status.label', name: 'Etat'},
            {name: 'Actions', cellTemplate: this.actionTmpl},
        ];
    }

    delete(quotation: Quotation) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.quotationService.remove(quotation).subscribe(() => {
                this.quotations.splice(this.quotations.indexOf(quotation), 1);
                this.rows = [...this.quotations];
                this.toastr.warning('Le devis a bien été supprimée 😕❗');
            });
        }
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        this.rows = this.quotations.filter((quotation: Quotation) => {
            return quotation.customer.name.toLowerCase().indexOf(val) !== -1
                || !val;
        });
        this.table.offset = 0;
    }

}
