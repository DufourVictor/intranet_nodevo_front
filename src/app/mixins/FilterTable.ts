import { BackendService } from '../../backend/services/backend.service';
import { ActivatedRoute } from '@angular/router';

export class FilterTable {
    private _stacks = [];
    private _columns = [];
    private _rows = [];
    service: BackendService<any>;

    get columns(): any[] {
        return this._columns;
    }

    set columns(value: any[]) {
        this._columns = value;
    }

    get stacks(): any[] {
        return this._stacks;
    }

    set stacks(value: any[]) {
        this.rows = this._stacks = value;
    }

    get rows(): any[] {
        return this._rows;
    }

    set rows(value: any[]) {
        this._rows = value;
    }

    constructor(
        service,
        route: ActivatedRoute,
        searchFilters: Array<string>
    ) {
        this.service = service;
        route.params.subscribe(evt => this.updateFilter(evt, searchFilters))
    }

    cleanString = (string) => {
        return string.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    updateFilter = (filters, searchFilters) => {
        if (Object.values(filters).length === 0) {
            this.rows = this.stacks;
        }

        Object.entries(filters).forEach(([label, value]) => {
            if (label === 'search') {
                this.rows = this.stacks.filter(stack => searchFilters
                    .filter(filter => this.cleanString(stack[filter]).includes(this.cleanString(value)))
                    .length > 0
                );
            } else {
                this.rows = this.stacks.filter(filter =>
                    this.cleanString((filter[label].label || filter[label])).includes(this.cleanString(value))
                )
            }
        });
    }

    setStack = (data) => (this.stacks = data);

    deleteObject = (object) => {
        this.stacks.splice(this.stacks.indexOf(object), 1);
        this.rows = [...this.stacks];
    }
}