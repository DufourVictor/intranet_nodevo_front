import { Component, Input, OnInit } from '@angular/core';
import { Group, Profile, User } from '../../../backend/model';
import { GroupsService, ProfilesService, UsersService } from '../../../backend/services';
import { Form, FormService } from '../../../backend/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    @Input() user: User = new User();
    profiles: Observable<Profile[]>;
    groups: Observable<Group[]>;
    managers: Observable<User[]>;
    form: Form<User>;

    constructor(
        private router: Router,
        private usersService: UsersService,
        private profilesService: ProfilesService,
        private groupsService: GroupsService,
        public formService: FormService,
        private toastr: ToastrService,
    ) {}

    ngOnInit() {
        this.form = this.formService.makeForm<User>(this.user);

        this.profiles = this.profilesService.getAll();
        this.groups = this.groupsService.getAll();
        this.managers = this.usersService.getAllByFilter('deleted', false);
    }

    save() {
        if (this.form.group.dirty && (this.form.group.valid || (this.user.id && this.form.group.controls.plainPassword.invalid))) {
            const user = this.form.get();
            this.usersService[user.id ? 'update' : 'add'](user).subscribe(() => {
                this.router.navigate(['settings/users']);
                this.toastr.success(`L'utilisateur ${user.fullName} a bien été ${user.id ? 'mis à jour' : 'ajouté'} ! 👍✅`);
            });
        } else {
            this.form.displayErrors();
        }
    }
}
