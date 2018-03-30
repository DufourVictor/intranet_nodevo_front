import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Contact, Customer, User } from '../../backend/model';
import { ContactsService } from '../../backend/services';
import { SpectreModalComponent } from '../spectre-modal/spectre-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    contacts: Contact[] = [];
    contact: Contact = new Contact();
    @Input() customer: Customer;
    modalTitle = 'Contact client';
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;

    constructor(
        private contactService: ContactsService,
        private toastr: ToastrService,
    ) {
    }

    getAllContact() {
        this.contactService.getAllBy('customers', this.customer.id).subscribe(cpys => this.contacts = cpys);
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
