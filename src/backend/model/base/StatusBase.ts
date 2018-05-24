// This file should not be modified, as it can be overwritten by the generator.
// The 'Status' class is here for customizations and will not be touched.


export class StatusBase {
  public static readonly _resource: string = 'statuses';
  get _resource(): string { return StatusBase._resource; };

  label: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;

}
