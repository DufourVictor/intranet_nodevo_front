import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GroupsService } from '../../../backend/services';
import { Group } from '../../../backend/model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SpectreModalComponent } from '../../spectre-modal/spectre-modal.component';
import { ToastrService } from 'ngx-toastr';
import { RoleGuardService } from '../../role-guard.service';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;

    groups: Group[];
    group: Group = new Group();
    modalTitle = 'Groupe';
    rows: Group[] = [];
    columns = [];

    constructor(
        protected groupsService: GroupsService,
        private toastr: ToastrService,
        public roleGuard: RoleGuardService
    ) {
    }

    getAllGroups() {
        this.groupsService.getAll().subscribe(groups => this.rows = this.groups = groups);
    }

    ngOnInit() {
        this.getAllGroups();
        this.columns = [
            {prop: 'label', name: 'Label'},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }

    activeModal(group = null) {
        this.group = group ? group : new Group();
        this.modalToggle.toggleActive();
    }

    closeModal() {
        this.modalToggle.toggleActive();
        this.getAllGroups();
    }

    confirmDelete(obj) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.groupsService.remove(obj).subscribe(() => {
                this.groups.splice(this.groups.indexOf(obj), 1);
                this.toastr.warning('Le groupe a bien été supprimé ! 😕❗️');
            });
        }
    }
}
