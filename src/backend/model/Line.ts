import { LineBase } from './base/LineBase';
import { SimpleLine } from './SimpleLine';

export class Line extends LineBase {
    id: number;

    constructor() {
        super();
        this.label = null;
        this.position = null;
        this.free = false;
        this.title = false;
        this.complexLines = [];
    }
}
