import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-table-filters',
    templateUrl: './table-filters.component.html',
    styleUrls: ['./table-filters.component.scss']
})
export class TableFiltersComponent implements OnInit {
    @Input() searchProperties: Array<string>;
    @Input() filterProperties: [{ name, type, label, subname }];
    filterForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.filterForm = this.fb.group({
            search: '',
            ...this.filterProperties.reduce((group, property) => {
                if (property.subname) {
                    group[`${property.name}.${property.subname}`] = '';
                } else {
                    group[property.name] = '';
                }
                return group;
            }, {})
        });
    }

    onFilter() {
        const queryParams = Object.entries(this.filterForm.controls)
            .filter(([, {value}]) => value !== '')
            .reduce((params, [key, {value}]) => {
                params[key] = value;
                return params;
            }, {});
        this.router.navigate([this.router.url.split(';')[0], queryParams]);
    }
}
