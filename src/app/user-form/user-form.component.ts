import { Component, Input, OnInit } from '@angular/core';
import { Group, User } from '../../backend/model';
import { Profile } from '../../backend/model';
import { GroupsService, ProfilesService, UsersService } from '../../backend/services';
import { Form, FormService } from '../../backend/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

    constructor(private router: Router,
                private usersService: UsersService,
                private profilesService: ProfilesService,
                private groupsService: GroupsService,
                protected formService: FormService,) {
    }

    ngOnInit() {
        this.form = this.formService.makeForm<User>(this.user);

        this.profilesService.getAll().subscribe(profiles => this.profiles = profiles);
        this.groupsService.getAll().subscribe(groups => this.groups = groups);
        this.usersService.getAll().subscribe(managers => this.managers = managers);
    }

    save() {
        console.log(Object.values(this.form.group.controls).filter((control: FormControl) => control.invalid));
        console.log(this.form.get());
        if (this.form.group.dirty && this.form.group.valid) {
            const user = this.form.get();
            if (user.id) {
                this.usersService.update(user).subscribe(() => this.router.navigate(['users']));
            } else {
                this.usersService.add(user).subscribe();
            }
        } else {
            this.form.displayErrors();
        }
    }
}
