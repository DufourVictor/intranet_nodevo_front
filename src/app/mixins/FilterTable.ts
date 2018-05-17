import { BackendService } from '../../backend/services/backend.service';
import { ActivatedRoute } from '@angular/router';

export class FilterTable {
    private _stacks = [];
    private _columns = [];
    private _rows = [];
    service: BackendService<any>;
    searchFilters: Array<any>;
    filters;

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
        searchFilters: Array<any>
    ) {
        this.service = service;
        this.searchFilters = searchFilters;
        route.params.subscribe(evt => {
            this.filters = evt;
            this.updateFilter();
        });
    }

    cleanString = (string) => {
        return string.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    updateFilter = () => {
        if (Object.values(this.filters).length === 0) {
            this.rows = this.stacks;
        }

        Object.entries(this.filters).forEach(([label, value]) => {
            if (label === 'search') {
                this.rows = this.stacks.filter(stack => this.searchFilters.filter(filter =>
                    this.cleanString(
                        stack[filter] ? stack[filter] : stack[filter.name][filter.subname]
                    ).includes(this.cleanString(value))
                ).length > 0);
            } else if (label.includes('.')) {
                const [name, subname] = label.split('.');
                this.rows = this.stacks.filter(filter =>
                    this.cleanString(filter[name][subname]).includes(this.cleanString(value))
                );
            } else {
                this.rows = this.stacks.filter(filter =>
                    this.cleanString(filter[label]).includes(this.cleanString(value))
                );
            }
        });
    }

    setStack = (data) => {
        this.stacks = data;
        this.updateFilter();
    }

    deleteObject = (object) => {
        this.stacks.splice(this.stacks.indexOf(object), 1);
        this.rows = [...this.stacks];
    }

    addObject = (object) => {
        this.stacks.push(object);
        this.rows = [...this.stacks];
    }
}
