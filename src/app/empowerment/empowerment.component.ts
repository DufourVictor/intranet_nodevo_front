import { Component, OnInit } from '@angular/core';
import { EmpowermentsService } from '../../backend/services/Empowerments.service';
import { Group } from '../../backend/model';
import { EmpowermentChildren } from '../../backend/model/EmpowermentChildren';

@Component({
    selector: 'app-empowerment',
    templateUrl: './empowerment.component.html',
    styleUrls: ['./empowerment.component.scss']
})
export class EmpowermentComponent implements OnInit {
    resources: EmpowermentChildren;
    groups: Group;

    constructor(private empowermentsService: EmpowermentsService) {
    }

    ngOnInit(): void {
        this.empowermentsService.createTree().subscribe(
            (response) => {
                this.resources = response.tree.children;
                this.groups = response.groups;
            }
        );
    }
}
