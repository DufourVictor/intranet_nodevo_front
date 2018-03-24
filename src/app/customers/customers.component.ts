import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CustomersService } from '../../backend/services';
import { Customer } from '../../backend/model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
    @ViewChild('businessTmpl') businessTmpl: TemplateRef<any>;
    @ViewChild('quotesTmpl') quotesTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;

    customers: Customer[] = [];
    rows: Customer[] = [];
    columns = [];

    constructor(
        private customersService: CustomersService,
        private toastr: ToastrService
    ) {
    }

    ngOnInit(): void {
        this.customersService.getAllByFilter('deleted', false).subscribe(customers => this.rows = this.customers = customers);

        this.columns = [
            {prop: 'codeClient', name: 'Code client'},
            {prop: 'name', name: 'Nom du client'},
            {name: 'Affaires', cellTemplate: this.businessTmpl},
            {name: 'Devis', cellTemplate: this.quotesTmpl},
            {prop: 'zipCode', name: 'Code postal'},
            {prop: 'city', name: 'Ville'},
            {prop: 'enabled', name: 'Statut', cellTemplate: this.enabledTmpl},
            {name: 'Actions', cellTemplate: this.actionTmpl},
        ];
    }

    toggleEnabled(customer: Customer): void {
        const clone = {...customer};
        clone.enabled = !clone.enabled;
        this.customersService.update(clone as Customer).subscribe(
            success => {
                customer.enabled = success.enabled;
                this.toastr.success(`L'utilisateur a bien été ${customer.enabled ? 'activé' : 'désactivé'} 🎉`);
            },
            error => this.toastr.error(`Une erreur est survenue 😢`)
        );
    }

    delete(customer: Customer): void {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            const clone = {...customer};
            clone.enabled = false;
            clone.deleted = true;
            this.customersService.update(clone as Customer).subscribe(
                successCustomer => {
                    customer.deleted = successCustomer.deleted;
                    customer.enabled = successCustomer.enabled;
                    this.customers.splice(this.customers.indexOf(customer), 1);
                    this.rows = [...this.customers];
                    this.toastr.warning('Le client a bien été supprimé ! 😕❗️');
                }
            );
        }
    }
}
