import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Contact, Customer } from '../../../backend/model/index';
import { Form, FormService } from '../../../backend/forms/index';
import { ContactsService, TypesService } from '../../../backend/services/index';
import { ToastrService } from 'ngx-toastr';
import { Type } from '../../../backend/model';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnChanges, OnInit {
    @Input() contact: Contact;
    @Input() customer: Customer;
    @Output() saveCost = new EventEmitter<any>();
    form: Form<Contact>;
    types: Type[] = [];
    private _contact: Contact;

    constructor(
        private formService: FormService,
        private contactsService: ContactsService,
        private typeService: TypesService,
        private toastr: ToastrService
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this._contact = changes.contact.currentValue;
        this.form = this.formService.makeForm<Contact>(this._contact);
    }

    ngOnInit() {
        this.typeService.getAll().subscribe(types => this.types = types)
    }

    save() {
        if (this.form.group.dirty && this.form.group.valid) {
            const contact = this.form.get();
            if (contact.id) {
                this.contactsService.update(contact).subscribe(() => this.saveCost.emit());
            } else {
                contact.setCustomer(this.customer.id);
                this.contactsService.add(contact).subscribe(() => this.saveCost.emit());
            }
            this.toastr.success('Le contact a bien été ajouté ! 👍✅');
            this.form.group.reset();
        } else {
            // force invalid inputs state to display errors
            this.toastr.error('Désolé le contact n\'a pas pu être mis à jour ! 😢❌');
            this.form.displayErrors();
        }
    }
}
