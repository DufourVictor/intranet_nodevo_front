import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Form, FormService } from '../../../../backend/forms';
import { ComplexLine, Profile, User } from '../../../../backend/model';
import { Observable } from 'rxjs/Observable';
import { ProfilesService, UsersService } from '../../../../backend/services';
import { SpectreModalComponent } from '../../../spectre-modal/spectre-modal.component';

@Component({
    selector: 'app-complex-line-form',
    templateUrl: './complex-line-form.component.html',
    styleUrls: ['./complex-line-form.component.scss']
})
export class ComplexLineFormComponent implements OnInit {
    forms: Form<ComplexLine>[];
    profiles: Observable<Profile[]>;
    users: User[];
    activeForm: Form<ComplexLine>;

    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;
    @Input() lines: ComplexLine[];
    @Input() displayHeader;
    @Output() linesChange: EventEmitter<ComplexLine[]> = new EventEmitter<ComplexLine[]>();

    constructor(
        protected formService: FormService,
        private profileService: ProfilesService,
        private userService: UsersService
    ) {
    }

    ngOnInit() {
        this.profiles = this.profileService.getAll();
        this.forms = this.lines.map(line => {
            line.collaborators = line.collaborators.map(c => c['@id']);
            return this.createForm(line);
        });
    }

    createForm (line) {
        const form = this.formService.makeForm(Object.assign(new ComplexLine(), line));
        form.group.valueChanges.subscribe(() => {
            this.linesChange.emit(this.forms.map(f => f.get()))
        });
        return form;
    }

    activeModal (form) {
        this.activeForm = form;
        this.userService.getAllByFilter('profile', form.get().profile.id).subscribe(users => {
            this.users = users;
            this.modalToggle.toggleActive();
        });
    }

    addColumn () {
        const form = this.createForm(new ComplexLine())
        this.forms.push(form);
    }

    isCollaborator(id) {
        return this.activeForm.get().collaborators
            .map(colab => +colab.split('/').reverse()[0])
            .includes(id)
        ;
    }

    changeCollaborator(form) {
        this.activeForm.group.controls.collaborators.setValue(
            new FormData(form).getAll('collaborators').map(col => '/' + User._resource + '/' + col)
        );
    }
}
