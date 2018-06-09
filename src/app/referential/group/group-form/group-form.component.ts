import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Group } from '../../../../backend/model';
import { Form, FormService } from '../../../../backend/forms';
import { GroupsService } from '../../../../backend/services';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-group-form',
    templateUrl: './group-form.component.html',
    styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnChanges {
    @Input() group: Group;
    @Output() saveGroup = new EventEmitter<any>();
    formGroup: Form<Group>;
    private _group: Group;

    constructor(
        protected formService: FormService,
        protected groupsService: GroupsService,
        protected toastr: ToastrService
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this._group = changes.group.currentValue;
        this.formGroup = this.formService.makeForm<Group>(this._group);
    }

    save() {
        if (this.formGroup.group.dirty && this.formGroup.group.valid) {
            const group = this.formGroup.get();
            if (group.id) {
                this.groupsService.update(group).subscribe(() => {
                    this.saveGroup.emit();
                    this.toastr.success(`Le groupe a bien été modifié ! 👍✅`);
                });
            } else {
                this.groupsService.add(group).subscribe(() => {
                    this.saveGroup.emit();
                    this.toastr.success(`Le groupe a bien été ajouté ! 👍✅`);
                });
            }
            this.formGroup.group.reset();
        } else {
            // force invalid inputs state to display errors
            this.toastr.error(`Désolé le groupe n'a pas pu être mis à jour ! 😢❌`);
            this.formGroup.displayErrors();
        }
    }
}
