import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../backend/model';
import { UsersService } from '../../backend/services';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
    user: User;

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.usersService.get(+params.id).subscribe(user => {
                    this.user = user;
                });
            } else {
                this.user = new User();
            }
        });
    }

}
