import { Collaborator } from '../../../shared/redux/slices/publicationsSlice';

export class Configuration {
  name: string;

  description: string;

  collaborators: Collaborator[];

  packageManager: string;

  tag: string;

  constructor(
    name: string,
    description: string,
    collaborators: Collaborator[],
    packageManager: string,
    tag: string
  ) {
    this.name = name;
    this.description = description;
    this.collaborators = collaborators;
    this.packageManager = packageManager;
    this.tag = tag;
  }
}
