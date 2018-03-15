import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { EmpowermentTree } from '../model/EmpowermentTree';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmpowermentsService {
    private _url = '/load/tree';

    constructor(private http: HttpClient) {
    }

    createTree() {
        return this.http.get(this._url).map(
            (response: EmpowermentTree) => new EmpowermentTree(
                response.tree,
                response.groups,
            )
        );
    }
}
