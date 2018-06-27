import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SimpleLine } from '../../../../backend/model';
import { Form, FormService } from '../../../../backend/forms';

@Component({
    selector: 'app-simple-line-form',
    templateUrl: './simple-line-form.component.html',
    styleUrls: ['./simple-line-form.component.scss']
})
export class SimpleLineFormComponent implements OnInit {
    form: Form<SimpleLine>;

    @Input() line: SimpleLine;
    @Output() lineChange: EventEmitter<SimpleLine> = new EventEmitter<SimpleLine>();

    constructor(
        public formService: FormService
    ) {}

    ngOnInit() {
        this.form = this.formService.makeForm(Object.assign(new SimpleLine(), this.line));
        this.form.group.valueChanges.subscribe(() => {
            this.lineChange.emit(this.form.get() as SimpleLine);
        });
    }

}
