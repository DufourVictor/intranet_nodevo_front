import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Form, FormService } from '../../../../backend/forms';
import { ComplexLine, Profile, User } from '../../../../backend/model';
import { ProfilesService, UsersService } from '../../../../backend/services';
import { SpectreModalComponent } from '../../../spectre-modal/spectre-modal.component';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-complex-line-form',
    templateUrl: './complex-line-form.component.html',
    styleUrls: ['./complex-line-form.component.scss']
})
export class ComplexLineFormComponent implements OnInit {
    forms: Form<ComplexLine>[];
    profiles: Profile[];
    users: User[];
    activeForm: Form<ComplexLine>;

    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;
    @Input() lines: ComplexLine[] = [];
    @Input() displayHeader;
    @Input() triggerAdd: Subject<any>;
    @Output() linesChange: EventEmitter<ComplexLine[]> = new EventEmitter<ComplexLine[]>();
    @Output() generalChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() columnAdded: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        protected formService: FormService,
        private profileService: ProfilesService,
        private userService: UsersService
    ) {
    }

    ngOnInit() {
        this.profileService.getAll().subscribe(profiles => this.profiles = profiles);
        this.forms = this.lines.map(line => {
            line.collaborators = line.collaborators.map(c => c['@id']);
            return this.createForm(line);
        });
        this.triggerAdd.subscribe(() => {
            this.forms.push(this.createForm(new ComplexLine()));
        });
    }

    createForm (line) {
        const form = this.formService.makeForm(Object.assign(new ComplexLine(), line));
        form.group.markAsDirty();
        ['label', 'tjm', 'profile', 'collaborators'].forEach(field => {
            form.group.get(field).valueChanges.subscribe((val) => {
                this.generalChange.emit(this.forms.map((f, ind, fs) => {
                    if (fs.indexOf(form) === ind) {
                        return Object.assign(form.get(), {[field]: val})
                    }
                    return f.get();
                }));
            });
        });
        form.group.get('time').valueChanges.subscribe((time) => {
            this.linesChange.emit(this.forms.map((f, ind, fs) => {
                if (fs.indexOf(form) === ind) {
                    return Object.assign(form.get(), {time})
                }
                return f.get();
            }))
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
        this.columnAdded.emit();
    }

    isCollaborator(id) {
        if (this.activeForm.get().collaborators) {
            return this.activeForm.get().collaborators
                .map((colab) => +colab.toString().split('/').reverse()[0])
                .includes(id);
        }

        return false;
    }

    changeCollaborator(form) {
        this.activeForm.group.controls.collaborators.setValue(
            new FormData(form).getAll('collaborators').map(col => '/' + User._resource + '/' + col)
        );
    }
}
