// This file should not be modified, as it can be overwritten by the generator.
// The 'User' class is here for customizations and will not be touched.

import { Profile } from '../Profile';

export class UserBase {
  public static readonly _resource: string = 'users';
  get _resource(): string { return UserBase._resource; };

  id: number;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  profile: Profile;

  setProfile(id: number): UserBase {
    this.profile = new Profile();
    this.profile.id = id;
    this.profile['@id'] = '/profiles/' + id;
    return this;
  }

}
