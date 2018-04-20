import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Contact, Customer } from '../../backend/model';
import { ContactsService } from '../../backend/services';
import { SpectreModalComponent } from '../spectre-modal/spectre-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;

    @Input() customer: Customer;
    contacts: Contact[] = [];
    contact: Contact = new Contact();
    modalTitle = 'Contact client';
    rows: Contact[] = [];
    columns = [];

    constructor(
        private contactService: ContactsService,
        private toastr: ToastrService,
    ) {
    }

    getAllContact() {
        this.contactService.getAllBy('customers', this.customer.id).subscribe(
            contacts => this.rows = this.contacts = contacts
        );

        this.columns = [
            {prop: 'lastName', name: 'Nom'},
            {prop: 'firstName', name: 'Prénom'},
            {prop: 'jobFunction', name: 'Fonction'},
            {prop: 'phone', name: 'Tél. bureau'},
            {prop: 'mobilePhone', name: 'Tél. mobile'},
            {prop: 'email', name: 'Email'},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }

    ngOnInit() {
        this.getAllContact();
    }

    activeModal(contact = null) {
        this.contact = contact || new Contact();
        this.modalToggle.toggleActive();
    }

    closeModal() {
        this.modalToggle.toggleActive();
        this.getAllContact();
    }

    confirmDelete(contact) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.contactService.remove(contact).subscribe(() => {
                this.contacts.splice(this.contacts.indexOf(contact), 1);

                this.toastr.warning('Le contact a bien été supprimé ! 😕❗️');
            });
        }
    }
}
