import { Component, OnInit } from '@angular/core';
import { BusinessesService } from '../../backend/services';
import { Business } from '../../backend/model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-business',
    templateUrl: './business.component.html',
    styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
    businesses: Business[] = [];

    constructor(private businessesService: BusinessesService, private toastr: ToastrService) {
    }

    ngOnInit() {
        this.businessesService.getAll().subscribe(data => this.businesses = data);
    }

    delete(business: Business) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.businessesService.remove(business).subscribe(() => {
                this.businesses.splice(this.businesses.indexOf(business), 1);
            });
        }
    }

    toggleEnabled(business: Business) {
        console.log(business);
        const clone = {...business};
        clone.enabled = !clone.enabled;
        this.businessesService.update(clone as Business).subscribe(
            () => {
                this.toastr.success('L\'affaire a été mise à jour.', 'Succès !');
            },
            (error) => {
                this.toastr.error('L\'affaire n\'a pas pu être mise à jour.', 'Erreur !');
            }
        );
    }
}
