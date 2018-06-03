import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TypesService } from '../../../backend/services';
import { Type } from '../../../backend/model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { SpectreModalComponent } from '../../spectre-modal/spectre-modal.component';

@Component({
    selector: 'app-type',
    templateUrl: './type.component.html',
    styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;

    types: Type[];
    type: Type = new Type();
    modalTitle = 'Type de contact';
    rows: Type[] = [];
    columns = [];

    constructor(
        protected typesService: TypesService,
        private toastr: ToastrService,
    ) {
    }

    getAllTypes() {
        this.typesService.getAll().subscribe(types => this.rows = this.types = types);
    }

    ngOnInit() {
        this.getAllTypes();
        this.columns = [
            {prop: 'label', name: 'Label'},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }
    activeModal(type = null) {
        this.type = type ? type : new Type();
        this.modalToggle.toggleActive();
    }

    closeModal() {
        this.modalToggle.toggleActive();
        this.getAllTypes();
    }

    confirmDelete(obj) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.typesService.remove(obj).subscribe(() => {
                this.types.splice(this.types.indexOf(obj), 1);
                this.toastr.warning('Le type de contact a bien été supprimé ! 😕❗️');
            });
        }
    }
}
