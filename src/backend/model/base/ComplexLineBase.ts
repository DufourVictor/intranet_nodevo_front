// This file should not be modified, as it can be overwritten by the generator.
// The 'ComplexLine' class is here for customizations and will not be touched.

import { Profile } from '../Profile';
import { User } from '../User';
import { Line } from '../Line';

export class ComplexLineBase {
  public static readonly _resource: string = 'complex_lines';
  get _resource(): string { return ComplexLineBase._resource; };

  profile: Profile;
  tjm: number;
  label: string;
  time: number;
  collaborators: User[];
  line: Line;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  setProfile(id: number): ComplexLineBase {
    this.profile = new Profile();
    this.profile.id = id;
    this.profile['@id'] = '/profiles/' + id;
    return this;
  }

  setLine(id: number): ComplexLineBase {
    this.line = new Line();
    this.line.id = id;
    this.line['@id'] = '/lines/' + id;
    return this;
  }

}
