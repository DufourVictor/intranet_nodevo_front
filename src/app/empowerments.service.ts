import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EmpowermentTree } from '../backend/model/EmpowermentTree';

@Injectable()
export class EmpowermentsService {
    private url_load_tree = '/load/tree';

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
}
