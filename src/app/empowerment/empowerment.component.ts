import { Component, OnInit } from '@angular/core';
import { Group } from '../../backend/model';
import { EmpowermentChildren } from '../../backend/model/EmpowermentChildren';
import { ToastrService } from 'ngx-toastr';
import { EmpowermentsService } from '../empowerments.service';

@Component({
    selector: 'app-empowerment',
    templateUrl: './empowerment.component.html',
    styleUrls: ['./empowerment.component.scss']
})
export class EmpowermentComponent implements OnInit {
    resources: EmpowermentChildren;
    groups: Group;

    constructor(private empowermentsService: EmpowermentsService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.empowermentsService.createTree().subscribe(
            (response) => {
                this.resources = response.tree.children;
                this.groups = response.groups;
            }
        );
    }

    toggleAuthorizationSwitch(groupId: number, resource: string, access: string): void {
        this.empowermentsService.switchEmpowerment(groupId, resource, access).subscribe(
            () => {
                this.toastr.success('L\'habilitation a été mise à jour.', 'Succès !');
            },
            (error) => {
                this.toastr.error('L\'habilitation n\'a pas pu être mise à jour.', 'Erreur !');
            }
        );
    }
}
