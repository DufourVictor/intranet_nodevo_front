import { Group } from './Group';
import { EmpowermentChildren } from './EmpowermentChildren';

export class EmpowermentTree {
    tree: {
        children: EmpowermentChildren;
    };
    groups: Group;

    constructor(tree, groups) {
        this.tree = tree;
        this.groups = groups;
    }
}
