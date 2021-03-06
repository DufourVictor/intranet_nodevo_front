// This file should not be modified, as it can be overwritten by the generator.
// The 'Profile' class is here for customizations and will not be touched.


export class ProfileBase {
  public static readonly _resource: string = 'profiles';
  get _resource(): string { return ProfileBase._resource; };

  label: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

}
