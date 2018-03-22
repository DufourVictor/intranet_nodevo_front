// This file should not be modified, as it can be overwritten by the generator.
// The 'Acl' class is here for customizations and will not be touched.

import { Group } from '../Group';

export class AclBase {
  public static readonly _resource: string = 'acls';
  get _resource(): string { return AclBase._resource; };

  group: Group;
  access: string;
  resourceName: string;
  authorized: boolean;

  setGroup(id: number): AclBase {
    this.group = new Group();
    this.group.id = id;
    this.group['@id'] = '/groups/' + id;
    return this;
  }

}
