
import {State} from './IProjectState'

export interface IProject {
    id: number;
    image: string;
    name: string;
    date_creation: Date;
    date_edition: Date;
    tags: string[];
    last_modified_by: string;
    description: string
    technologies: string[];
    coauthors: string[];
    state: State;
}