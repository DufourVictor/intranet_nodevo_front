import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BusinessesService } from '../../backend/services';
import { Business } from '../../backend/model';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-business',
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    businesses: Business[] = [];
    rows: Business[] = [];
    columns = [];
    customerId: number;

    constructor(
        private businessesService: BusinessesService,
        private toastr: ToastrService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.customerId = params['id'];
        });

        if (this.customerId) {
            this.businessesService.getAllByFilter('customer', this.customerId).subscribe(data => this.businesses = data);
        } else {
            this.businessesService.getAll().subscribe(data => this.businesses = data);
        }

        this.columns = [
            {prop: 'codeBusiness', name: 'Code affaire'},
            {prop: 'label', name: 'Nom de l\'affaire'},
            {prop: 'customer.name', name: 'Nom du client'},
            {prop: 'enabled', name: 'Statut', cellTemplate: this.enabledTmpl},
            {name: 'Actions', cellTemplate: this.actionTmpl},
        ];
    }

    delete(business: Business) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.businessesService.remove(business).subscribe(() => {
                this.businesses.splice(this.businesses.indexOf(business), 1);
            });
        }
    }

    toggleEnabled(business: Business) {
        const clone = {...business};
        clone.enabled = !clone.enabled;
        this.businessesService.update(clone as Business).subscribe(
            (success) => {
                business.enabled = success.enabled;
                this.toastr.success(`L'affaire a bien été ${business.enabled ? 'activé' : 'désactivé'} 👍✅`);
            },
            error => this.toastr.error(`Désolé l'affaire ${business.label} n'a pas pu être mise à jour 😢❌`)
        );
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        this.rows = this.businesses.filter((business: Business) => {
            return business.customer.name.toLowerCase().indexOf(val) !== -1
                || !val;
        });
        this.table.offset = 0;
    }
}
