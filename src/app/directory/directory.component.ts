import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../../backend/model';
import { ContactsService } from '../../backend/services';
import { Angular2Csv } from 'angular2-csv';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FilterTable } from '../mixins/FilterTable';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-directory',
    templateUrl: './directory.component.html',
    styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent extends FilterTable implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    exportContact: Contact[];
    columns = [];
    fileName = 'Export-annuaire';

    constructor(
        private contactsService: ContactsService,
        private route: ActivatedRoute
    ) {
        super(contactsService, route, ['lastName', 'firstName', {name: 'customer', subname: 'name'}, 'jobFunction', 'phone', 'email']);
    }

    ngOnInit(): void {
        this.contactsService.getAll().subscribe(this.setStack);

        this.columns = [
            {prop: 'lastName', name: 'Nom'},
            {prop: 'firstName', name: 'Prénom'},
            {prop: 'customer.name', name: 'Client'},
            {prop: 'jobFunction', name: 'Fonction'},
            {prop: 'phone', name: 'Numéro'},
            {prop: 'email', name: 'Mail'},
        ];
    }

    exportCsv(): void {
        this.exportContact = this.exportData();
        const head = [
            'Nom',
            'Prénom',
            'Client',
            'Fonction',
            'Numéro',
            'Email',
        ];
        const options = {
            fieldSeparator: ';',
            headers: head,
        };
        new Angular2Csv(this.exportContact, this.fileName, options);
    }

    exportData() {
        const arrayCompanies = [];
        this.rows.forEach(contact => {
            arrayCompanies.push(contact.getExportData());
        });

        return arrayCompanies;
    }
}
