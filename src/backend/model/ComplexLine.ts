import { ComplexLineBase } from './base/ComplexLineBase';

export class ComplexLine extends ComplexLineBase {
    updateFrom(line) {
        this.profile = line.profile;
        this.label = line.label;
        this.collaborators = line.collaborators;
        this.tjm = line.tjm;

        return this;
    }
}
