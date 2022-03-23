export interface Json {
  [key: string]: string | number | boolean;
}

export interface Collaborator {
  id: string;
  githubUsername: string;
  role: string;
}

export interface Publication {
  id: string;
  imagePath?: string;
  name: string;
  description: string;
  collaborators: Collaborator[];
  packageManager: 'npm' | 'yarn';
  useSass: boolean;
  useTypescript: boolean;
  tags: string[];
}
