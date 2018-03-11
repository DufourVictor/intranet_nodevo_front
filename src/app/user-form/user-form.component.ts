import { Component, Input, OnInit } from '@angular/core';
import { Group, User } from '../../backend/model';
import { Profile } from '../../backend/model';
import { GroupsService, ProfilesService, UsersService } from '../../backend/services';
import { Form, FormService } from '../../backend/forms';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    @Input() user: User;
    profiles: Profile[] = [];
    groups: Group[] = [];
    managers: User[] = [];
    form: Form<User>;

    constructor(
        private usersService: UsersService,
        private profilesService: ProfilesService,
        private groupsService: GroupsService,
        private formService: FormService,
    ) {}

    ngOnInit() {
        this.form = this.formService.makeForm<User>(this.user);

        this.profilesService.getAll().subscribe(profiles => this.profiles = profiles);
        this.groupsService.getAll().subscribe(groups => this.groups = groups);
        this.usersService.getAll().subscribe(managers => this.managers = managers);
    }

    save() {
        if (this.form.group.dirty && this.form.group.valid) {
            const user = this.form.get();
            if (user.id) {
                this.usersService.update(user).subscribe(user => console.log('yeah!'));
            } else {
                this.usersService.add(user).subscribe(user => console.log('yeah!'));
            }
        } else {
            // force invalid inputs state to display errors
            this.form.displayErrors();
        }
    }

    equals (item1, item2) {
        return item1.id === item2.id;
    }

}
