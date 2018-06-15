import { ComplexLineBase } from './base/ComplexLineBase';

export class ComplexLine extends ComplexLineBase {
    updateFrom(line) {
        this.profile = line.profile;
        this.label = line.label;
        this.collaborators = line.collaborators;
        this.tjm = line.tjm;

        return this;
    }

    duplicateComplexLine (line = new ComplexLine()) {
        const {label, tjm, profile, collaborators} = this;
        return Object.assign(line, {label, tjm, profile, collaborators});
    }

    getCommonProps () {
        return {
            label: this.label,
            tjm: this.tjm,
            profile: this.profile,
            collaborators: this.collaborators
        }
    }
}
