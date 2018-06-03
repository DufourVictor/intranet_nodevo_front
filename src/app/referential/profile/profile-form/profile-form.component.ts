import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Profile } from '../../../../backend/model';
import { Form, FormService } from '../../../../backend/forms';
import { ProfilesService } from '../../../../backend/services';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-profile-form',
    templateUrl: './profile-form.component.html',
    styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnChanges {
    @Input() profile: Profile;
    @Output() saveProfile = new EventEmitter<any>();
    formProfile: Form<Profile>;
    private _profile: Profile;

    constructor(
        protected formService: FormService,
        protected profileService: ProfilesService,
        protected toastr: ToastrService
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this._profile = changes.profile.currentValue;
        this.formProfile = this.formService.makeForm<Profile>(this._profile);
    }

    save() {
        if (this.formProfile.group.dirty && this.formProfile.group.valid) {
            const profile = this.formProfile.get();
            if (profile.id) {
                this.profileService.update(profile).subscribe(() => {
                    this.saveProfile.emit();
                    this.toastr.success(`Le profil a bien été modifié ! 👍✅`);
                });
            } else {
                this.profileService.add(profile).subscribe(() => {
                    this.saveProfile.emit();
                    this.toastr.success(`Le profil a bien été ajouté ! 👍✅`);
                });
            }
            this.formProfile.group.reset();
        } else {
            // force invalid inputs state to display errors
            this.toastr.error(`Désolé le profil n'a pas pu être mis à jour ! 😢❌`);
            this.formProfile.displayErrors();
        }
    }
}
