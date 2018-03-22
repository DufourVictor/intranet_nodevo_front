import { Component, OnInit } from '@angular/core';
import { Business } from '../../../backend/model';
import { ActivatedRoute } from '@angular/router';
import { BusinessesService } from '../../../backend/services';

@Component({
    selector: 'app-business-details',
    templateUrl: './business-details.component.html',
    styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit {
    business: Business;

    constructor(
        private route: ActivatedRoute,
        private businessesService: BusinessesService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.businessesService.get(+params.id).subscribe(business => this.business = business);
            } else {
                this.business = new Business();
            }
        });
    }

}
