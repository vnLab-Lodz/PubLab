import { STATE } from './IProjectState';

export interface IProject {
  id: number;
  image: string;
  name: string;
  // Dates have to be serializable, cannot be of type Date
  date_creation: string;
  date_edition: string;
  tags: string[];
  last_modified_by: string;
  description: string;
  technologies: string[];
  coauthors: string[];
  state: STATE;
}
