import { Component, Input, OnInit } from '@angular/core';
import { Group, User } from '../../backend/model';
import { Profile } from '../../backend/model';
import { GroupsService, ProfilesService, UsersService } from '../../backend/services';

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

    constructor(
        private usersService: UsersService,
        private profilesService: ProfilesService,
        private groupsService: GroupsService,
    ) {}

    ngOnInit() {
        this.profilesService.getAll().subscribe(profiles => {
            this.profiles = profiles;
        });
        this.groupsService.getAll().subscribe(groups => {
            this.groups = groups;
        });
        this.usersService.getAll().subscribe(managers => {
            this.managers = managers;
        });
    }

    save() {
        this.user.setProfile(this.user.profile.id);
        this.user.setGroup(this.user.group.id);
        this.usersService.update(this.user).subscribe(
            success => {console.log('success');},
            error => {console.log(error);}
        );
    }

}
