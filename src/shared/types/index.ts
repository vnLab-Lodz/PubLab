export interface Json {
  [key: string]: string | number | boolean;
}

export enum USER_ROLES {
  EDITOR = 'editor',
  DEVELOPER = 'developer',
}

export interface Collaborator {
  id: string;
  githubUsername: string;
  role: USER_ROLES;
}

export interface PublicationBase {
  id: string;
  imagePath?: string;
  name: string;
  description: string;
  collaborators: Collaborator[];
  packageManager: 'npm' | 'yarn';
  useSass: boolean;
  useTypescript: boolean;
}

export interface Publication extends PublicationBase {
  creationDate: number;
  lastUpdate: number;
  status: 'cloned' | 'remote';
  tags: string[];
}
