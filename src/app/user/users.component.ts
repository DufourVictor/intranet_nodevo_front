import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../backend/model/index';
import { UsersService } from '../../backend/services/index';
import { ToastrService } from 'ngx-toastr';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    @ViewChild('actionTmpl') actionTmpl: TemplateRef<any>;
    @ViewChild('enabledTmpl') enabledTmpl: TemplateRef<any>;
    @ViewChild(DatatableComponent) table: DatatableComponent;

    users: User[] = [];
    rows: User[] = [];
    columns = [];

    constructor(private usersService: UsersService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.usersService.getAllByFilter('deleted', false).subscribe(users => this.rows = this.users = users);

        this.columns = [
            {prop: 'firstName', name: 'Prénom'},
            {prop: 'lastName', name: 'Nom'},
            {prop: 'profile.label', name: 'Profil'},
            {prop: 'enabled', name: 'Statut', cellTemplate: this.enabledTmpl},
            {name: 'Actions', cellTemplate: this.actionTmpl},
        ];
    }

    delete(user: User) {
        if (confirm('Etes-vous sûr de vouloir supprimer la ligne sélectionnée ?')) {
            const clone = {...user};
            clone.enabled = false;
            clone.deleted = true;
            this.usersService.update(clone as User).subscribe(
                successUser => {
                    user.deleted = successUser.deleted;
                    user.enabled = successUser.enabled;
                    this.users.splice(this.users.indexOf(user), 1);
                    this.rows = [...this.users];
                    this.toastr.warning(`L'utilisateur a bien été supprimé ! 😕❗️`);
                }
            );
        }
    }

    toggleEnabled(user: User) {
        const clone = {...user};
        clone.enabled = !clone.enabled;
        this.usersService.update(clone as User).subscribe(
            success => {
                user.enabled = success.enabled;
                this.toastr.success(`L'utilisateur a bien été ${user.enabled ? 'activé' : 'désactivé'} 👍✅`);
            },
            error => this.toastr.error(`Désolé l'utilisateur ${user.fullName} n'a pas pu être mis à jour 😢❌`)
        );
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        this.rows = this.users.filter((user: User) => {
            return user.firstName.toLowerCase().indexOf(val) !== -1
                || user.lastName.toLowerCase().indexOf(val) !== -1
                || !val;
        });
        this.table.offset = 0;
    }
}
