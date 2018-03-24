import { Component, OnInit } from '@angular/core';
import { Acl, Group } from '../../backend/model';
import { EmpowermentChildren } from '../../backend/model/EmpowermentChildren';
import { ToastrService } from 'ngx-toastr';
import { EmpowermentsService } from '../empowerments.service';
import { AclsService } from '../../backend/services';

@Component({
    selector: 'app-empowerment',
    templateUrl: './empowerment.component.html',
    styleUrls: ['./empowerment.component.scss']
})
// @TODO : Remove input disabled when the loader will be made
export class EmpowermentComponent implements OnInit {
    resources: EmpowermentChildren;
    groups: Group;
    acls: Acl[] = [];

    constructor(
        private empowermentsService: EmpowermentsService,
        private toastr: ToastrService,
        private aclsService: AclsService
    ) {
    }

    ngOnInit(): void {
        this.getAcls();
        this.empowermentsService.createTree().subscribe(
            (response) => {
                this.resources = response.tree.children;
                this.groups = response.groups;
            }
        );
    }

    existAcl(groupId: number, resource: string, access: string): Acl | null {
        return this.acls.find((acl: Acl) => {
            return acl.resourceName === resource && acl.access === access && acl.group.id === groupId && acl.authorized === true;
        });
    }

    switchAcl(groupId: number, resource: string, access: string, input): void {
        input.target.disabled = !input.target.disabled;
        const empowerment = this.acls.find((acl: Acl) => {
            return acl.resourceName === resource && acl.access === access && acl.group.id === groupId;
        });
        empowerment ? this.updateAcl(empowerment, input) : this.createAcl(groupId, resource, access, input);
    }

    updateAcl(acl: Acl, input): void {
        acl.authorized = !acl.authorized;
        this.aclsService.update(acl).subscribe(
            () => {
                this.toastr.success('L\'habilitation a été mise à jour 👍✅', 'Succès !');
                input.target.disabled = !input.target.disabled;
            },
            (error) => {
                this.toastr.error('Désolé l\'habilitation n\'a pas pu être mise à jour 😢❌', 'Erreur !');
            }
        );
    }

    createAcl(groupId: number, resource: string, access: string, input) {
        const acl = new Acl();
        acl.setGroup(groupId);
        acl.resourceName = resource;
        acl.access = access;
        acl.authorized = true;

        this.aclsService.add(acl).subscribe(
            () => {
                this.toastr.success('L\'habilitation a été créée avec succès 👍✅', 'Succès !');
                this.getAcls(input);
            },
            (error) => {
                this.toastr.error('Désolé l\'habilitation n\'a pas pu être mise à jour 😢❌', 'Erreur !');
            }
        );
    }

    getAcls(input = null): void {
        this.aclsService.getAll().subscribe(
            acls => {
                this.acls = acls;
                if (input) {
                    input.target.disabled = !input.target.disabled;
                }
            }
        );
    }
}
