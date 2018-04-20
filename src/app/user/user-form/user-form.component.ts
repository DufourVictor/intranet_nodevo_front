import { Component, Input, OnInit } from '@angular/core';
import { Group, Profile, User } from '../../../backend/model';
import { GroupsService, ProfilesService, UsersService } from '../../../backend/services';
import { Form, FormService } from '../../../backend/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    @Input() user: User = new User();
    profiles: Profile[] = [];
    groups: Group[] = [];
    managers: User[] = [];
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

        this.profilesService.getAll().subscribe(profiles => this.profiles = profiles);
        this.groupsService.getAll().subscribe(groups => this.groups = groups);
        this.usersService.getAllByFilter('deleted', false).subscribe(managers => this.managers = managers);
    }

    save() {
        if (this.form.group.dirty && this.form.group.valid) {
            const user = this.form.get();
            if (user.id) {
                this.usersService.update(user).subscribe(() => {
                    this.router.navigate(['users']);
                    this.toastr.success(`L'utilisateur ${user.fullName} a bien été mis à jour ! 👍✅`);
                });
            } else {
                this.usersService.add(user).subscribe(() => {
                    this.router.navigate(['settings/users']);
                    this.toastr.success(`L'utilisateur ${user.fullName} a bien été ajouté ! 👍✅`);
                });
            }
        } else {
            this.form.displayErrors();
        }
    }
}
