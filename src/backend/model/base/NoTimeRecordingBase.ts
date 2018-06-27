// This file should not be modified, as it can be overwritten by the generator.
// The 'NoTimeRecording' class is here for customizations and will not be touched.

import { User } from '../User';

export class NoTimeRecordingBase {
  public static readonly _resource: string = 'no_time_recordings';
  get _resource(): string { return NoTimeRecordingBase._resource; };

  reason: string;
  fromDate: Date;
  toDate: Date;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

  setUser(id: number): NoTimeRecordingBase {
    this.user = new User();
    this.user.id = id;
    this.user['@id'] = '/users/' + id;
    return this;
  }

}
