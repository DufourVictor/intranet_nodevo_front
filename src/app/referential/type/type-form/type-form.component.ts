import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Type } from '../../../../backend/model';
import { Form, FormService } from '../../../../backend/forms';
import { TypesService } from '../../../../backend/services';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-type-form',
    templateUrl: './type-form.component.html',
    styleUrls: ['./type-form.component.scss']
})
export class TypeFormComponent implements OnChanges {
    @Input() type: Type;
    @Output() saveType = new EventEmitter<any>();
    formType: Form<Type>;
    private _type: Type;

    constructor(
        protected formService: FormService,
        protected typesService: TypesService,
        protected toastr: ToastrService
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this._type = changes.type.currentValue;
        this.formType = this.formService.makeForm<Type>(this._type);
    }

    save() {
        if (this.formType.group.dirty && this.formType.group.valid) {
            const type = this.formType.get();
            if (type.id) {
                this.typesService.update(type).subscribe(() => {
                    this.saveType.emit();
                    this.toastr.success(`Le type de contact a bien été modifié ! 👍✅`);
                });
            } else {
                this.typesService.add(type).subscribe(() => {
                    this.saveType.emit();
                    this.toastr.success(`Le type de contact a bien été ajouté ! 👍✅`);
                });
            }
            this.formType.group.reset();
        } else {
            // force invalid inputs state to display errors
            this.toastr.error(`Désolé le type de contact n'a pas pu être mis à jour ! 😢❌`);
            this.formType.displayErrors();
        }
    }
}
