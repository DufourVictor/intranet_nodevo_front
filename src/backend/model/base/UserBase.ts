// This file should not be modified, as it can be overwritten by the generator.
// The 'User' class is here for customizations and will not be touched.

import { Profile } from '../Profile';
import { Group } from '../Group';
import { User } from '../User';

export class UserBase {
  public static readonly _resource: string = 'users';
  get _resource(): string { return UserBase._resource; };

  username: string;
  plainPassword: string;
  password: string;
  enabled: boolean;
  deleted: boolean;
  notes: string;
  profile: Profile;
  group: Group;
  managers: User[];
  firstName: string;
  lastName: string;
  email: string;

  setProfile(id: number): UserBase {
    this.profile = new Profile();
    this.profile.id = id;
    this.profile['@id'] = '/profiles/' + id;
    return this;
  }

  setGroup(id: number): UserBase {
    this.group = new Group();
    this.group.id = id;
    this.group['@id'] = '/groups/' + id;
    return this;
  }

}
