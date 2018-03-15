import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { EmpowermentTree } from '../backend/model/EmpowermentTree';

@Injectable()
export class EmpowermentsService {
    private url_load_tree = '/load/tree';
    private url_switch_empowerment = '/switch';

    constructor(private http: HttpClient) {
    }

    createTree() {
        return this.http.get(this.url_load_tree).map(
            (response: EmpowermentTree) => new EmpowermentTree(
                response.tree,
                response.groups,
            )
        );
    }

    switchEmpowerment(groupId, resource, access) {
        return this.http.post(this.url_switch_empowerment, {
            groupId: groupId,
            resource: resource,
            access: access,
        });
    }
}
