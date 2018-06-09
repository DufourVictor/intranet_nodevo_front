import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ProfilesService } from '../../../backend/services';
import { Profile } from '../../../backend/model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { SpectreModalComponent } from '../../spectre-modal/spectre-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild(SpectreModalComponent) modalToggle: SpectreModalComponent;

    profiles: Profile[];
    profile: Profile = new Profile();
    modalTitle = 'Profil';
    rows: Profile[] = [];
    columns = [];

    constructor(
        protected profileService: ProfilesService,
        private toastr: ToastrService,
    ) {
    }

    getAllProfiles() {
        this.profileService.getAll().subscribe(data => this.rows = this.profiles = data);
    }

    ngOnInit() {
        this.getAllProfiles();
        this.columns = [
            {prop: 'label', name: 'Label'},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }

    activeModal(profile = null) {
        this.profile = profile ? profile : new Profile();
        this.modalToggle.toggleActive();
    }

    closeModal() {
        this.modalToggle.toggleActive();
        this.getAllProfiles();
    }

    confirmDelete(obj) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            this.profileService.remove(obj).subscribe(() => {
                this.profiles.splice(this.profiles.indexOf(obj), 1);
                this.toastr.warning('Le profil a bien été supprimé ! 😕❗️');
            });
        }
    }

}
