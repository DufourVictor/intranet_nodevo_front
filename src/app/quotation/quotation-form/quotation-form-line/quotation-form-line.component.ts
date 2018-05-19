import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Line } from '../../../../backend/model';
import { Form, FormService } from '../../../../backend/forms';

@Component({
    selector: 'app-quotation-form-line',
    templateUrl: './quotation-form-line.component.html',
    styleUrls: ['./quotation-form-line.component.scss']
})
export class QuotationFormLineComponent implements OnInit {
    forms: Form<Line>[] = [];

    @Input()
    numberLines = 4;
    @Input()
    lines: Line[] = [];
    @Output()
    linesChange = new EventEmitter<Line[]>();

    constructor(
        public formService: FormService,
    ) {}

    ngOnInit() {
        this.forms = this.lines.map(line => {
            const form = this.formService.makeForm(Object.assign(new Line(), line));
            form.group.markAsDirty();

            return form;
        });
        for (let i = this.lines.length; i < this.numberLines; i++) {
            const form = this.formService.makeForm<Line>(Object.assign(new Line(), {position: i}));
            this.titleDisable(form, form.get().title);

            this.forms.push(form);
        }
        this.orderForms();

        this.forms.forEach(form => {
            form.group.valueChanges.subscribe(() => this.emitLines());
            form.group.get('title').valueChanges.subscribe(val => this.titleDisable(form, val));
        })
    }

    emitLines () {
        this.linesChange.emit(this.forms.filter(f => f.group.dirty && f.group.valid).map(f => f.get()));
    }

    getCost (form: Form<Line>) {
        const {priceHt, quantity} = form.get();

        return priceHt * quantity;
    }

    orderForms () {
        this.forms.sort((a, b) => a.get().position > b.get().position ? 1 : -1);
    }

    titleDisable (form: Form<Line>, disable = false) {
        ['quantity', 'unit', 'priceHt'].forEach(prop => {
            form.group.controls[prop][disable ? 'disable' : 'enable']();
        })
    }

    setPosition (index: number, val: number) {
        const line = this.forms[index].get();
        if (line.position + val < 0 || line.position + val >= this.numberLines) {
            return;
        }
        line.position = line.position + val;

        const otherLineIndex = this.forms.indexOf(
            this.forms.find(f => +f.get().position === +line.position)
        );
        this.forms[index].set(line);

        return otherLineIndex !== -1 ? this.setPosition(otherLineIndex, (val * -1)) : this.orderForms();
    }

    deleteLine (index: number) {
        this.forms.splice(index, 1);
        this.emitLines();
    }
}
