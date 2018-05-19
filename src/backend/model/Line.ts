import { LineBase } from './base/LineBase';

export class Line extends LineBase {
    id: number;

    constructor() {
        super();
        this.label = null;
        this.quantity = null;
        this.position = null;
        this.priceHt = null;
        this.unit = null;
        this.free = false;
        this.title = false;
    }
}
