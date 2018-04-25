import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BusinessesService } from '../../backend/services';
import { Business, Customer } from '../../backend/model';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Params } from '@angular/router';
import { FilterTable } from '../mixins/FilterTable';

@Component({
    selector: 'app-business',
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.scss']
})
export class BusinessComponent extends FilterTable implements OnInit {
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    customerId: number;

    constructor(
        private businessesService: BusinessesService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute
    ) {
        super(businessesService, activatedRoute, ['codeBusiness', 'label']);
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.customerId = params['id'];
        });

        if (this.customerId) {
            this.businessesService.getAllByFilter('customer', this.customerId).subscribe(this.setStack);
        } else {
            this.businessesService.getAllByFilter('deleted', false).subscribe(this.setStack);
        }

        this.columns = [
            {prop: 'codeBusiness', name: 'Code affaire'},
            {prop: 'label', name: 'Nom de l\'affaire'},
            {prop: 'customer.name', name: 'Nom du client'},
            {prop: 'enabled', name: 'Statut', cellTemplate: this.enabledTmpl},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }

    delete(business: Business) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            business.enabled = false;
            business.deleted = true;
            this.businessesService.update(business).subscribe(
                () => {
                    this.deleteObject(business);
                    this.toastr.warning('L\'affaire a bien été supprimée 😕❗');
                },
                () => {
                    business.enabled = true;
                    business.deleted = false;
                }
            );
        }
    }

    toggleEnabled(business: Business) {
        business.enabled = !business.enabled;
        this.businessesService.update(business as Business).subscribe(
            () => this.toastr.success(`L'affaire a bien été ${business.enabled ? 'activé' : 'désactivé'} 👍✅`),
            () => {
                business.enabled = !business.enabled;
                this.toastr.error(`Désolé l'affaire ${business.label} n'a pas pu être mise à jour 😢❌`);
            }
        );
    }
}
