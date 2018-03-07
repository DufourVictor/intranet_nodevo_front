import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../backend/model';
import { Profile } from '../../backend/model';
import { ProfilesService, UsersService } from '../../backend/services';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
    @Input() user: User;
    profiles: Profile[] = [];

    constructor(
        private usersService: UsersService,
        private profilesService: ProfilesService
    ) {}

    ngOnInit() {
        this.profilesService.getAll().subscribe(profiles => {
            this.profiles = profiles;
        });
    }

    save() {
        this.user.setProfile(this.user.profile.id)
        this.usersService.update(this.user).subscribe(
            success => {console.log('success');},
            error => {console.log('error');}
        );
    }

}
