import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CostPerYear, User } from '../../backend/model';
import { CostPerYearsService } from '../../backend/services';
import { SpectreModalComponent } from '../spectre-modal/spectre-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-cost-per-year',
    templateUrl: './cost-per-year.component.html',
    styleUrls: ['./cost-per-year.component.scss']
})
export class CostPerYearComponent implements OnInit {
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;

    @Input() user: User;
    costPerYears: CostPerYear[] = [];
    cost: CostPerYear = new CostPerYear();
    modalTitle = 'Coût par année';
    rows: CostPerYear[] = [];
    columns = [];

    constructor(
        private costPerYearsService: CostPerYearsService,
        private toastr: ToastrService,
    ) {
    }

    getAllCosts() {
        this.costPerYearsService.getAllBy('users', this.user.id).subscribe(
            cpys => this.rows = this.costPerYears = cpys
        );

        this.columns = [
            {prop: 'cost', name: 'Coût'},
            {prop: 'comment', name: 'Commentaire'},
            {prop: 'year', name: 'Année'},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }

    ngOnInit() {
        this.getAllCosts();
    }

    activeModal(cost = null) {
        this.cost = cost || new CostPerYear();
        this.modalToggle.toggleActive();
    }

    closeModal() {
        this.modalToggle.toggleActive();
        this.getAllCosts();
    }

    confirmDelete(cost) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.costPerYearsService.remove(cost).subscribe(() => {
                this.costPerYears.splice(this.costPerYears.indexOf(cost), 1);

                this.toastr.warning('Le coût par année a bien été supprimé ! 😕❗️');
            });
        }
    }
}
