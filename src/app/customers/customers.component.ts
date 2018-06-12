import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomersService } from '../../backend/services';
import { Customer } from '../../backend/model';
import { ToastrService } from 'ngx-toastr';
import { FilterTable } from '../mixins/FilterTable';
import { ActivatedRoute } from '@angular/router';
import { RoleGuardService } from '../role-guard.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends FilterTable implements OnInit {
    @ViewChild('businessTmpl') businessTmpl: TemplateRef<any>;
    @ViewChild('quotesTmpl') quotesTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;

    constructor(
        private customersService: CustomersService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        public roleGuard: RoleGuardService
    ) {
        super(customersService, route, ['codeClient', 'name', 'city']);
    }

    ngOnInit(): void {
        this.customersService.getAllByFilter('deleted', false).subscribe(this.setStack);

        this.columns = [
            {prop: 'codeClient', name: 'Code client'},
            {prop: 'name', name: 'Nom du client'},
            {name: 'Affaires', cellTemplate: this.businessTmpl, cellClass: 'link'},
            {name: 'Devis', cellTemplate: this.quotesTmpl},
            {prop: 'zipCode', name: 'Code postal'},
            {prop: 'city', name: 'Ville'},
            {prop: 'enabled', name: 'Statut', cellTemplate: this.enabledTmpl},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }

    toggleEnabled(customer: Customer): void {
        customer.enabled = !customer.enabled;
        this.customersService.update(customer as Customer).subscribe(
            () => this.toastr.success(`Le client a bien été ${customer.enabled ? 'activé' : 'désactivé'} 🎉`),
            () => {
                customer.enabled = !customer.enabled;
                this.toastr.error(`Désolé le client n'a pas pu être mis à jour 😢❌`);
            }
        );
    }

    delete(customer: Customer): void {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            customer.enabled = false;
            customer.deleted = true;
            this.customersService.update(customer as Customer).subscribe(
                () => {
                    this.deleteObject(customer);
                    this.toastr.warning(`Le client a bien été supprimé ! 😕❗`);
                },
                () => {
                    customer.enabled = true;
                    customer.deleted = false;
                }
            );
        }
    }
}
