import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Line, Profile } from '../../../../backend/model';
import { Form, FormService } from '../../../../backend/forms';
import { Observable } from 'rxjs/Observable';
import { ProfilesService } from '../../../../backend/services';

@Component({
    selector: 'app-quotation-form-line',
    templateUrl: './quotation-form-line.component.html',
    styleUrls: ['./quotation-form-line.component.scss']
})
export class QuotationFormLineComponent implements OnInit {
    forms: Form<Line>[] = [];
    profiles: Observable<Profile[]>;
    @Input() lines: Line[];
    @Input() type: string = 'simple';
    @Output() linesChange = new EventEmitter<Line[]>();

    constructor(
        public formService: FormService,
        private profileService: ProfilesService
    ) {}

    ngOnInit() {
        this.profiles = this.profileService.getAll();
        this.forms = this.lines.map(line => {
            const form = this.createLineForm(line);
            form.group.markAsDirty();
            return form;
        });
        this.addLine();
        this.orderForms();
    }

    createLineForm (line) {
        const form = this.formService.makeForm(Object.assign(new Line(), line));
        form.group.valueChanges.subscribe(() => this.emitLines());
        form.group.get('title').valueChanges.subscribe(val => this.titleDisable(form, val));

        return form;
    }

    addLine () {
        const line = new Line();
        line.position = this.forms.length;
        this.forms.push(this.createLineForm(line));
    }

    getDirtyForms () {
        return this.forms.filter(f => f.group.dirty && f.group.valid).map(f => f.get());
    }

    emitLines () {
        this.linesChange.emit(this.getDirtyForms());
    }

    simpleChange (form, evt) {
        form.group.get('simpleLine').setValue(evt);
    }

    complexChange (form, lines, baseLines) {
        console.log(lines.map((line, ind) => line.updateFrom(baseLines[ind])));
        form.group.get('complexLines').setValue(lines.map((line, ind) => line.updateFrom(baseLines[ind])));
        this.forms.forEach(f => {
            console.log(f.get().complexLines.map((line, ind) => line.updateFrom(baseLines[ind])));
            f.group.get('complexLines').setValue(f.get().complexLines.map((line, ind) => line.updateFrom(baseLines[ind])));
        })
    }

    getComplexLines (form) {
        if (form.get().complexLines.length > 0) {
            return form.get().complexLines;
        } else {
            return this.forms[0].get().complexLines.map(line => {
                line.time = 0;
                return line;
            })
        }
    }

    getCost (form: Form<Line>) {
        const {simpleLine, complexLines} = form.get();
        if (simpleLine) {
            const {priceHt, quantity} = simpleLine;

            return priceHt * quantity;
        } else if (complexLines) {
            let price = 0;
            // complexLines.forEach(line => {
            //     price += line.tjm * line.time;
            // });

            return price;
        }
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
        if (line.position + val < 0 || line.position + val >= this.getDirtyForms().length) {
            return;
        }
        line.position = line.position + val;

        const otherLineIndex = this.forms.indexOf(
            this.forms.find(f => +f.get().position === +line.position)
        );
        this.forms[index].set(line);
        this.forms[index].group.markAsDirty();

        this.emitLines();

        return otherLineIndex !== -1 ? this.setPosition(otherLineIndex, (val * -1)) : this.orderForms();
    }

    deleteLine (index: number) {
        this.forms.splice(index, 1);
        this.emitLines();
    }
}
