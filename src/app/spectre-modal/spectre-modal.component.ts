import { Component, ContentChild, Input, OnInit } from '@angular/core';

@Component({
    selector: 'spectre-modal',
    templateUrl: './spectre-modal.component.html',
    styleUrls: ['./spectre-modal.component.scss']
})
export class SpectreModalComponent {
    @Input() title: string;
    @Input() active = false;

    @ContentChild('form') form;

    toggleActive() {
        this.active = !this.active;
    }

}
