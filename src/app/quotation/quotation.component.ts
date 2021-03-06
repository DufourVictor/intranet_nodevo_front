import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Quotation } from '../../backend/model';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { QuotationsService } from '../../backend/services';
import { FilterTable } from '../mixins/FilterTable';
import { ActivatedRoute } from '@angular/router';
import { RoleGuardService } from '../role-guard.service';

@Component({
    selector: 'app-quotation',
    templateUrl: './quotation.component.html',
    styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent extends FilterTable implements OnInit {
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(
        private quotationService: QuotationsService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        public roleGuard: RoleGuardService
    ) {
        super(quotationService, route, [
            'codeQuotation',
            'label',
            {name: 'business', subname: 'label'},
            {name: 'customer', subname: 'name'},
            {name: 'provision', subname: 'label'},
            {name: 'status', subname: 'label'},
        ]);
    }

    ngOnInit() {
        this.quotationService.getAll().subscribe(this.setStack);
        this.columns = [
            {prop: 'codeQuotation', name: 'Code devis'},
            {prop: 'label', name: 'Intitulé du devis'},
            {prop: 'business.label', name: 'Affaire'},
            {prop: 'customer.name', name: 'Client'},
            {prop: 'provision.label', name: 'Type de prestation'},
            {prop: 'totalHt', name: 'Prix HT'},
            {prop: 'status.label', name: 'Etat'},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }

    delete(quotation: Quotation) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.quotationService.remove(quotation as Quotation).subscribe(() => {
                this.deleteObject(quotation);
                this.toastr.warning('Le devis a bien été supprimée 😕❗');
            });
        }
    }

    duplicate(quotation: Quotation) {

        const duplicateQuotation = Object.create(quotation);

        duplicateQuotation.id = null;
        duplicateQuotation['@id'] = null;
        duplicateQuotation['@type'] = null;

        this.quotationService.add(duplicateQuotation).subscribe((data) => {
            this.addObject(data);
            this.toastr.success('Le devis a été dupliqué 👍✅📑', 'Succès !');
        });
    }
}
