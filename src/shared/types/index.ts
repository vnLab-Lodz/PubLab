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

export interface Snippet {
  id: string;
  name: string;
  code: string;
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

export interface IPublication extends PublicationBase {
  creationDate: number;
  lastUpdate: number;
  tags: string[];
  snippets: Snippet[];
  keepDescriptionVisible: boolean;
  keepSnippetsVisible: boolean;
}

export interface LocalPublication extends IPublication {
  status: 'cloned';
  dirPath: string;
}

export interface RemotePublication extends IPublication {
  status: 'remote';
  cloneUrl: string;
  repoName: string;
}

export type Publication = LocalPublication | RemotePublication;

export interface AssetObject {
  data: string;
  mimeType: string;
  encoding: string;
}
