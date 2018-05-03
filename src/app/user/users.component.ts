import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../backend/model';
import { UsersService } from '../../backend/services';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { FilterTable } from '../mixins/FilterTable';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent extends FilterTable implements OnInit {
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(
        private usersService: UsersService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {
        super(usersService, route, ['firstName', 'lastName', {name: 'profile', subname: 'label'}]);
    }

    ngOnInit() {
        this.service.getAllByFilter('deleted', false).subscribe(this.setStack);

        this.columns = [
            {prop: 'firstName', name: 'Prénom'},
            {prop: 'lastName', name: 'Nom'},
            {prop: 'profile.label', name: 'Profil'},
            {prop: 'enabled', name: 'Statut', cellTemplate: this.enabledTmpl},
            {name: '', cellTemplate: this.actionTmpl},
        ];
    }

    toggleEnabled(user: User) {
        user.enabled = !user.enabled;
        this.service.update(user as User).subscribe(
            () => this.toastr.success(`L'utilisateur a bien été ${user.enabled ? 'activé' : 'désactivé'} 👍✅`),
            () => {
                user.enabled = !user.enabled;
                this.toastr.error(`Désolé l'utilisateur ${user.fullName} n'a pas pu être mis à jour 😢❌`);
            }
        );
    }

    delete(object) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            object.enabled = false;
            object.deleted = true;
            this.service.update(object).subscribe(
                () => {
                    this.deleteObject(object);
                    this.toastr.warning(`L'utilisateur a bien été supprimé 😕❗`);
                },
                () => {
                    object.enabled = true;
                    object.deleted = false;
                }
            );
        }
    }
}
